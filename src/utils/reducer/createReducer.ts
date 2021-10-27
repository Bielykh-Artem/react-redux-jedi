import { AnyAction } from "redux";

export const createReducer =
  <T>(initialState: T, handlers: { [key: string]: Function }) =>
  (state = initialState, action: AnyAction) =>
    handlers.hasOwnProperty(action.type) ? handlers[action.type](state, action) : state;
