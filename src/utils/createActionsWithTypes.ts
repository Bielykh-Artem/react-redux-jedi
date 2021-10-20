import { DEFAULT_PREFIXES } from "./constants";
import { createActionTypes } from "./createActionTypes";
import { createActions } from "./createActions";

export const createActionsWithTypes = (constantsForActions: string[], additinalPrefixes?: string[]) => {
  let p: string[] = DEFAULT_PREFIXES;

  if (additinalPrefixes && additinalPrefixes.length) {
    p = [...new Set(p.concat(additinalPrefixes))];
  }

  return {
    actions: createActions(constantsForActions, p),
    actionTypes: createActionTypes(constantsForActions, p),
  };
};
