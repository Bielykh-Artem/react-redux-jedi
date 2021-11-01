import { Dispatch, AnyAction, Reducer } from "redux";
import { createSelector } from "reselect";
import { TYPES } from "./";

export enum ERRORS {
  ADD = "ADD_ERROR",
  REMOVE = "REMOVE_ERROR",
}

export const initialErrorsState = {
  errors: [],
};

export interface IErrorsState {
  errors: { type: string; err?: string | Record<string, any> }[];
}

export const connectErrors: Reducer<IErrorsState> = (state: IErrorsState = initialErrorsState, action) => {
  switch (action.type) {
    case ERRORS.ADD:
      return { ...state, errors: state.errors.concat(action.payload) };
    case ERRORS.REMOVE:
      return { ...state, errors: state.errors.filter((err) => err.type !== action.payload.type) };
    default:
      return { ...state };
  }
};

export const selectErrors = (state: { errors: IErrorsState }) => state.errors;
export const getErrors = createSelector(selectErrors, (state) => state.errors);
export const getRequestErrorStatus = (requestType: string) =>
  createSelector(selectErrors, (state) => state.errors.some((l) => l.type === requestType));
export const getRequestError = (requestType: string) =>
  createSelector(selectErrors, (state) => state.errors.find((l) => l.type === requestType));

export const createErrorsMiddleware =
  () =>
  <T>({ getState, dispatch }: { getState: () => T & { errors: IErrorsState }; dispatch: Dispatch }) => {
    return (next: (action: AnyAction) => void) => (action: AnyAction) => {
      const {
        errors: { errors },
      } = getState();

      if (action.type.includes(TYPES.F)) {
        dispatch({ type: ERRORS.ADD, payload: { type: action.type, err: action.payload } });
      } else if (action.type.includes(TYPES.R)) {
        const requestTypeToFailure = `${action.type.replace(TYPES.R, "")}${TYPES.F}`;
        if (errors.some((err) => err.type === requestTypeToFailure)) {
          dispatch({ type: ERRORS.REMOVE, payload: { type: requestTypeToFailure } });
        }
      } else if (action.type.includes(TYPES.S)) {
        const successTypeToFailure = `${action.type.replace(TYPES.S, "")}${TYPES.F}`;
        if (errors.some((err) => err.type === successTypeToFailure)) {
          dispatch({ type: ERRORS.REMOVE, payload: { type: successTypeToFailure } });
        }
      }

      return next(action);
    };
  };
