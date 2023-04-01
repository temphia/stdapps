import { Writable, writable } from "svelte/store";

export interface State {
  event_types: object[];
  events: object[];
}

export const createStore = () => {
  const state: Writable<State> = writable({
    event_types: [],
    events: [],
  });

  return { state, subscribe: state.subscribe };
};
