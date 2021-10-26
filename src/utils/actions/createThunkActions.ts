import { TYPE_PREFIXES } from "../";
import { IActionsOpts, IThunkActions } from "../";
import {
  useFullAction,
  useDefaultAction,
  useActionWithCb,
  useActionWithOpts,
  useDefaultThunkActionRequest,
  useThunkActionWithCbRequest,
  useFullThunkActionRequest,
  useThunkActionWithOptsRequest,
  createPrefixes,
  actionsWithFuncAliases,
} from "./utils";

export const createThunkActions = (
  constantsForActions: string[],
  prefixes?: string[],
  additionalOptions?: IActionsOpts,
) => {
  const actions: IThunkActions = {};

  let prefixesArr: string[] = createPrefixes(prefixes, additionalOptions);

  [...new Set(constantsForActions)].forEach((aT) => {
    actions[aT] = {};

    [...new Set(prefixesArr)].forEach((t: string) => {
      if (additionalOptions) {
        const { withCallback, withOptions } = additionalOptions;

        if (withCallback && withOptions) {
          //@ts-ignore
          actions[aT][t] = t === TYPE_PREFIXES.REQUEST ? useFullThunkActionRequest(aT) : useFullAction(aT, t);
        } else if (withCallback && !withOptions) {
          //@ts-ignore
          actions[aT][t] = t === TYPE_PREFIXES.REQUEST ? useThunkActionWithCbRequest(aT) : useActionWithCb(aT, t);
        } else if (!withCallback && withOptions) {
          //@ts-ignore
          actions[aT][t] = t === TYPE_PREFIXES.REQUEST ? useThunkActionWithOptsRequest(aT) : useActionWithOpts(aT, t);
        } else {
          //@ts-ignore
          actions[aT][t] = t === TYPE_PREFIXES.REQUEST ? useDefaultThunkActionRequest(aT) : useDefaultAction(aT, t);
        }
      } else {
        //@ts-ignore
        actions[aT][t] = t === TYPE_PREFIXES.REQUEST ? useFullThunkActionRequest(aT) : useFullAction(aT, t);
      }
    });
  });

  if (additionalOptions && additionalOptions.useActionAliasName) {
    return actionsWithFuncAliases(actions);
  } else {
    return actions;
  }
};
