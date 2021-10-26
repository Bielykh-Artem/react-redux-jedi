import { IActions, IActionsOpts } from "../";
import {
  useFullAction,
  useDefaultAction,
  useActionWithCb,
  useActionWithOpts,
  createPrefixes,
  actionsWithFuncAliases,
} from "./utils";

export const createActions = (constantsForActions: string[], prefixes?: string[], additionalOptions?: IActionsOpts) => {
  const actions: IActions = {};

  let prefixesArr: string[] = createPrefixes(prefixes, additionalOptions);

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
    return actionsWithFuncAliases(actions);
  } else {
    return actions;
  }
};
