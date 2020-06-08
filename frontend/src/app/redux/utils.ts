import {produce} from 'immer';

export function createReducer(initialState, handlers) {
  return produce((draft, action) => {
    if (handlers.hasOwnProperty(action.type)) {
      handlers[action.type](draft, action)
    }
  }, initialState);
}