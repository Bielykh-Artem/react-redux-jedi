import { AnyAction } from "redux";

export interface IActionTypes {
  [key: string]: { [key: string]: string };
}

export interface IActions {
  [key: string]: { [key: string]: (payload?: Object, cb?: () => void, options?: Object) => AnyAction };
}
