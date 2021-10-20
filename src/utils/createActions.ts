import { DEFAULT_PREFIXES } from "./constants";
import { IActions } from "./interfaces";

export const createActions = (constantsForActions: string[], prefixes?: string[]) => {
  const actions: IActions = {};

  constantsForActions.forEach((aT) => {
    actions[aT] = {};

    (prefixes || DEFAULT_PREFIXES).forEach((t) => {
      actions[aT][t] = (payload?: Object, cb?: () => void, options?: Object) => ({
        type: `${aT}_${t}`,
        payload,
        cb,
        options,
      });
    });
  });

  return actions;
};
