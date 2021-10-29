import { Dispatch, AnyAction, Reducer } from "redux";
import { createSelector } from "reselect";

export enum LOADERS {
  START = "START_LOADER",
  STOP = "STOP_LOADER",
}

export enum TYPES {
  R = "REQUEST",
  S = "SUCCESS",
  F = "FAILURE",
}

export const initialLoadersState = {
  isLoading: false,
  count: 0,
  loaders: [],
};

export interface ILoadersState {
  isLoading: boolean;
  count: number;
  loaders: string[];
}

export const connectLoader: Reducer<ILoadersState> = (state: ILoadersState = initialLoadersState, action) => {
  switch (action.type) {
    case LOADERS.START:
      return { ...state, isLoading: true, count: state.count + 1, loaders: [...state.loaders].concat(action.payload) };
    case LOADERS.STOP:
      return {
        ...state,
        isLoading: !!(state.count - 1),
        count: state.count - 1,
        loaders: [...state.loaders].filter((l) => l !== action.payload),
      };
    default:
      return { ...state };
  }
};

export const selectLoaders = (state: { loaders: ILoadersState }) => state.loaders;

export const getLoaderStatus = () => createSelector(selectLoaders, (state) => state.isLoading);
export const getLoadersCount = () => createSelector(selectLoaders, (state) => state.count);
export const getRequestLoaderStatus = (requestType: string) =>
  createSelector(selectLoaders, (state) => state.loaders.some((l) => l === requestType));

export interface ILoadingHandlerMiddleware {
  exceptions?: string[];
  useActionLogger?: boolean;
}

export const createLoaderMiddleware =
  (exceptions?: string[] | undefined) =>
  <T>({ getState, dispatch }: { getState: () => T & { loaders: ILoadersState }; dispatch: Dispatch }) => {
    return (next: (action: AnyAction) => void) => (action: AnyAction) => {
      const { type } = action;
      let exceptionArr: string[] = [LOADERS.STOP, LOADERS.STOP, "@@INIT"];

      if (exceptions) {
        exceptionArr = exceptionArr.concat(exceptions);
      }

      const {
        loaders: { loaders },
      } = getState();

      if (!exceptionArr.includes(type)) {
        if (type.includes(TYPES.R)) {
          dispatch({
            type: LOADERS.START,
            payload: type,
          });
        } else {
          const matchType = type.replace(TYPES.S, TYPES.R).replace(TYPES.F, TYPES.R);
          if (loaders.some((l) => l === matchType)) {
            dispatch({
              type: LOADERS.STOP,
              payload: matchType,
            });
          }
        }
      }

      return next(action);
    };
  };
