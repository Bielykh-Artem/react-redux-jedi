import { TYPE_PREFIXES } from "../constants";

export interface Action<T = any> {
  type: T;
}

export interface AnyAction extends Action {
  [extraProps: string]: any;
}

export interface IActionTypes {
  [key: string]: { [key: string]: string };
}

export type ActionType = (payload?: Object, cb?: () => void, options?: Object) => AnyAction;

export interface IActions {
  [key: string]: { [key: string]: ActionType };
}

export interface IActionTypesOpts {
  useOnlyCustomPrefixes?: boolean;
}

export interface IActionsOpts extends IActionTypesOpts {
  withCallback?: boolean;
  withOptions?: boolean;
  useActionAliasName?: boolean;
}

export interface IActionsWithTypesOpts extends IActionTypesOpts, IActionsOpts {}

export type TAction = (payload?: Object, cb?: () => void, options?: Object) => AnyAction;
export type TThunkAction = (request: Function, payload?: Object, cb?: () => void, options?: Object) => AnyAction;
export interface TThunkActionType {
  [TYPE_PREFIXES.REQUEST]?: TThunkAction;
  [TYPE_PREFIXES.SUCCESS]?: TAction;
  [TYPE_PREFIXES.FAILURE]?: TAction;
}
export interface IThunkActions {
  [key: string]: TThunkActionType;
}
