import Hashids from "hashids";

const hid = new Hashids();

console.log("@@HID", hid)

export const generateId = () => hid.encode((Math.random() * 10000000).toFixed());
