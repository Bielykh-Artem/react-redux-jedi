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
