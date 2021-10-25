import { DEFAULT_PREFIXES } from "./constants";
import { IActions, IActionsOpts } from "./interfaces";

export const createActions = (constantsForActions: string[], prefixes?: string[], additionalOptions?: IActionsOpts) => {
  const actions: IActions = {};

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

  [...new Set(constantsForActions)].forEach((aT) => {
    actions[aT] = {};

    [...new Set(prefixesArr)].forEach((t) => {
      if (additionalOptions) {
        const { withCallback, withOptions } = additionalOptions;

        if (withCallback && withOptions) {
          actions[aT][t] = useFullAction(aT, t);
        } else if (withCallback && !withOptions) {
          actions[aT][t] = useActionWithCb(aT, t);
        } else if (!withCallback && withOptions) {
          actions[aT][t] = useActionWithOpts(aT, t);
        } else {
          actions[aT][t] = useDefaultAction(aT, t);
        }
      } else {
        actions[aT][t] = useFullAction(aT, t);
      }
    });
  });

  if (additionalOptions && additionalOptions.useActionAliasName) {
    const actionsWithFuncAliases: { [key: string]: (payload?: Object, cb?: () => void, options?: Object) => any } = {};

    Object.entries(actions).forEach(([key, value]) => {
      Object.entries(value).forEach(([_key, _value]) => {
        actionsWithFuncAliases[camelCase([key.split("_")].concat([_key]).join(" "))] = _value;
      });
    });

    return actionsWithFuncAliases;
  } else {
    return actions;
  }
};

const useFullAction = (aT: string, t: string) => (payload?: Object, cb?: () => void, options?: Object) => ({
  type: `${aT}_${t}`,
  payload,
  cb,
  options,
});

const useDefaultAction = (aT: string, t: string) => (payload?: Object) => ({
  type: `${aT}_${t}`,
  payload,
});

const useActionWithCb = (aT: string, t: string) => (payload?: Object, cb?: () => void) => ({
  type: `${aT}_${t}`,
  payload,
  cb,
});

const useActionWithOpts = (aT: string, t: string) => (payload?: Object, options?: Object) => ({
  type: `${aT}_${t}`,
  payload,
  options,
});

const camelCase = (str: string) => {
  let string = str
    .toLowerCase()
    .replace(/[^A-Za-z0-9]/g, " ")
    .split(" ")
    .reduce((result, word) => result + capitalize(word.toLowerCase()));
  return string.charAt(0).toLowerCase() + string.slice(1);
};

const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.toLowerCase().slice(1);
