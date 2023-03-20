import { Writable, writable } from "svelte/store";

export interface State {
  event_types: object[];
  events: object[];
  device_types: object[];
  device_beacons: object[];
}

export const createStore = () => {
  const state: Writable<State> = writable({
    device_beacons: [],
    device_types: [],
    event_types: [],
    events: [],
  });

  return { state, subscribe: state.subscribe };
};
