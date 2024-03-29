import * as encoding from "lib0/encoding.js";
import * as decoding from "lib0/decoding.js";
import { Observable } from "lib0/observable.js";
import * as Y from "yjs"; // eslint-disable-line
import * as syncProtocol from "y-protocols/sync.js";
import * as awarenessProtocol from "y-protocols/awareness.js";

const messageSync = 0;
const messageQueryAwareness = 3;
const messageAwareness = 1;


/**
 * EasyProvider is generic provider has no transport specific knowledge
 * you have to give a callback to be called when it has update to send and
 * call its handleRemote method when new data arrives from other end 
 */
export class EasyProvider extends Observable {

  /**
 * @param {string} name
 * @param {Y.Doc} doc
 * @param {any} on_handle
 */
  constructor(name, doc, out_handle) {
    super();
    this.doc = doc;
    this.name = name
    this.out_handle = out_handle
    this.synced = false
    this.synced_emitted = false
    this.interval = null

    doc.on('update', this.handlerUpdate)
    this.awareness = new awarenessProtocol.Awareness(doc);

    this.emit('status', [{
      status: 'connecting'
    }])
  }

  start = () => {
    this.sendState()

    if (this.awareness.getLocalState() !== null) {
      const encoderAwarenessState = encoding.createEncoder();
      encoding.writeVarUint(encoderAwarenessState, messageAwareness);
      encoding.writeVarUint8Array(encoderAwarenessState, awarenessProtocol.encodeAwarenessUpdate(this.awareness, [this.doc.clientID]));
      this.out_handle(encoding.toUint8Array(encoderAwarenessState))
    }

    this.emit('status', [{
      status: 'connected'
    }])


    const encoderSync = encoding.createEncoder()
    encoding.writeVarUint(encoderSync, messageSync)
    syncProtocol.writeSyncStep1(encoderSync, this.doc)

    this.out_handle(encoding.toUint8Array(encoderSync))

    const encoderState = encoding.createEncoder()
    encoding.writeVarUint(encoderState, messageSync)
    syncProtocol.writeSyncStep2(encoderState, this.doc)


    this.out_handle(encoding.toUint8Array(encoderState))

    const encoderAwarenessQuery = encoding.createEncoder()
    encoding.writeVarUint(encoderAwarenessQuery, messageQueryAwareness)

    this.out_handle(encoding.toUint8Array(encoderAwarenessQuery))

    this.interval = setInterval(this.sendState, 5000)
  }


  sendState = () => {
    console.log("@tick", this.synced)

    // if (this.synced && !this.synced_emitted) {
    //   this.emit('synced', [true])
    //   this.synced_emitted = true
    // }

    const encoder = encoding.createEncoder()
    encoding.writeVarUint(encoder, messageSync)
    syncProtocol.writeSyncStep1(encoder, this.doc)
    this.out_handle(encoding.toUint8Array(encoder))
  }

  close = () => {
    clearInterval(this.interval)
    this.awareness.off('update', this.awarenessUpdateHandler)
    this.doc.off('update', this.handlerUpdate)

    this.destroy()
  }

  /**
   * @param {Uint8Array} data
   */

  handleRemote = (data) => {
    const decoder = decoding.createDecoder(data)
    const encoder = encoding.createEncoder()
    const messageType = decoding.readVarUint(decoder)

    switch (messageType) {
      case messageSync:
        encoding.writeVarUint(encoder, messageSync)
        const syncMessageType = syncProtocol.readSyncMessage(decoder, encoder, this.doc, this)
        if (syncMessageType === syncProtocol.messageYjsSyncStep2 && !this.synced) {
          this.synced = true
          this.emit('synced', [true])
        } else {
          console.log("@skipping msgsync", syncMessageType)
        }
        break;
      case messageQueryAwareness:
        console.log("@awerness_query")
        encoding.writeVarUint(encoder, messageAwareness);
        encoding.writeVarUint8Array(encoder, awarenessProtocol.encodeAwarenessUpdate(this.awareness, Array.from(this.awareness.getStates().keys())));
        break;
      case messageAwareness:
        console.log("@awerness")
        awarenessProtocol.applyAwarenessUpdate(this.awareness, decoding.readVarUint8Array(decoder), this);
        break;
      default:
        console.log("@skipping_msgtype", messageType)
        break;
    }

    if (encoding.length(encoder) > 1) {
      this.out_handle(encoding.toUint8Array(encoder))
    }

    console.log("@done", messageType)
  }


  awarenessUpdateHandler = ({ added, updated, removed }, _origin) => {
    const changedClients = added.concat(updated).concat(removed)

    const encoder = encoding.createEncoder()
    encoding.writeVarUint(encoder, messageAwareness)
    encoding.writeVarUint8Array(
      encoder,
      awarenessProtocol.encodeAwarenessUpdate(this.awareness, changedClients)
    )

    this.out_handle(this, encoding.toUint8Array(encoder))
  }

  handlerUpdate = (update, origin) => {
    if (origin !== this) {
      const encoder = encoding.createEncoder()
      encoding.writeVarUint(encoder, messageSync)
      syncProtocol.writeUpdate(encoder, update)
      this.out_handle(encoding.toUint8Array(encoder))
    }
  };
}


export const encodeToBase64 = (uint8Array) => {
  const arrayBuffer = uint8Array.buffer;
  const dataView = new DataView(arrayBuffer);
  let binaryString = "";
  for (let i = 0; i < dataView.byteLength; i++) {
    binaryString += String.fromCharCode(dataView.getUint8(i));
  }
  return btoa(binaryString);
};

export const decodeFromBase64 = (base64String) => {
  const binaryString = atob(base64String);
  const uint8Array = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    uint8Array[i] = binaryString.charCodeAt(i);
  }
  return uint8Array;
};