import { Dispatch } from "redux";
import { TYPE_PREFIXES, IActionsOpts, DEFAULT_PREFIXES, IActions, IThunkActions } from "../../";

export const useFullAction = (aT: string, t: string) => (payload?: Object, cb?: () => void, options?: Object) => ({
  type: `${aT}_${t}`,
  payload,
  cb,
  options,
});

export const useDefaultAction = (aT: string, t: string) => (payload?: Object) => ({
  type: `${aT}_${t}`,
  payload,
});

export const useActionWithCb = (aT: string, t: string) => (payload?: Object, cb?: () => void) => ({
  type: `${aT}_${t}`,
  payload,
  cb,
});

export const useActionWithOpts = (aT: string, t: string) => (payload?: Object, options?: Object) => ({
  type: `${aT}_${t}`,
  payload,
  options,
});

export const useDefaultThunkActionRequest = (aT: string) => (request: Function, payload?: Object) => {
  return (dispatch: Dispatch) => {
    return request(payload)
      .then((res: Object) => dispatch({ type: `${aT}_${TYPE_PREFIXES.SUCCESS}`, payload: res }))
      .catch((err: Error) => dispatch({ type: `${aT}_${TYPE_PREFIXES.FAILURE}`, payload: err }));
  };
};

export const useThunkActionWithCbRequest = (aT: string) => (request: Function, payload?: Object, cb?: () => void) => {
  return (dispatch: Dispatch) => {
    return request(payload)
      .then((res: Object) => dispatch({ type: `${aT}_${TYPE_PREFIXES.SUCCESS}`, payload: res }))
      .catch((err: Error) => dispatch({ type: `${aT}_${TYPE_PREFIXES.FAILURE}`, payload: err }))
      .finally(() => cb?.());
  };
};

export const useFullThunkActionRequest =
  (aT: string) => (request: Function, payload?: Object, cb?: () => void, options?: Object) => {
    return (dispatch: Dispatch) => {
      return request(payload)
        .then((res: Object) => dispatch({ type: `${aT}_${TYPE_PREFIXES.SUCCESS}`, payload: res, options }))
        .catch((err: Error) => dispatch({ type: `${aT}_${TYPE_PREFIXES.FAILURE}`, payload: err, options }))
        .finally(() => cb?.());
    };
  };

export const useThunkActionWithOptsRequest =
  (aT: string) => (request: Function, payload?: Object, options?: Object) => {
    return (dispatch: Dispatch) => {
      return request(payload)
        .then((res: Object) => dispatch({ type: `${aT}_${TYPE_PREFIXES.SUCCESS}`, payload: res, options }))
        .catch((err: Error) => dispatch({ type: `${aT}_${TYPE_PREFIXES.FAILURE}`, payload: err, options }));
    };
  };

export const camelCase = (str: string) => {
  let string = str
    .toLowerCase()
    .replace(/[^A-Za-z0-9]/g, " ")
    .split(" ")
    .reduce((result, word) => result + capitalize(word.toLowerCase()));
  return string.charAt(0).toLowerCase() + string.slice(1);
};

export const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.toLowerCase().slice(1);

export const createPrefixes = (prefixes?: string[], additionalOptions?: IActionsOpts) => {
  let prefixesArr: string[] = [];

  if (prefixes && prefixes.length) {
    if (additionalOptions && additionalOptions.useOnlyCustomPrefixes) {
      prefixesArr = [...prefixesArr, ...prefixes];
    } else {
      prefixesArr = [...DEFAULT_PREFIXES, ...prefixes];
    }
  } else {
    prefixesArr = DEFAULT_PREFIXES;
  }

  return prefixesArr;
};

export const actionsWithFuncAliases = (actions: IActions | IThunkActions) => {
  const actionsWithFuncAliases: { [key: string]: (payload?: Object, cb?: () => void, options?: Object) => any } = {};

  Object.entries(actions).forEach(([key, value]) => {
    Object.entries(value).forEach(([_key, _value]) => {
      //@ts-ignore
      actionsWithFuncAliases[camelCase([key.split("_")].concat([_key]).join(" "))] = _value;
    });
  });

  return actionsWithFuncAliases;
};
