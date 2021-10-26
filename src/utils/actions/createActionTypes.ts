import { DEFAULT_PREFIXES } from "../";
import { IActionTypes, IActionTypesOpts } from "../";

export const createActionTypes = (
  constantsForActions: string[],
  prefixes?: string[],
  additionalOptions?: IActionTypesOpts,
) => {
  const actionTypes: IActionTypes = {};

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
    actionTypes[aT] = {};

    [...new Set(prefixesArr)].forEach((t) => {
      actionTypes[aT][t] = `${aT}_${t}`;
    });
  });

  return actionTypes;
};
