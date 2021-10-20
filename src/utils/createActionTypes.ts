import { DEFAULT_PREFIXES } from "./constants";
import { IActionTypes } from "./interfaces";

export const createActionTypes = (constantsForActions: string[], prefixes?: string[]) => {
  const actionTypes: IActionTypes = {};

  constantsForActions.forEach((aT) => {
    actionTypes[aT] = {};

    (prefixes || DEFAULT_PREFIXES).forEach((t) => {
      actionTypes[aT][t] = `${aT}_${t}`;
    });
  });

  return actionTypes;
};
