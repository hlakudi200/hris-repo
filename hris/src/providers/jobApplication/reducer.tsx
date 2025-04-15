import { handleActions } from "redux-actions";
import { IJobApplicationStateContext, INITIAL_STATE } from "./context";
import { JobApplicationActionEnums } from "./actions";

export const JobApplicationReducer = handleActions<IJobApplicationStateContext>(
  {
    [JobApplicationActionEnums.submitJobApplicationPending]: (
      state,
      action
    ) => ({
      ...state,
      ...action.payload,
    }),
    [JobApplicationActionEnums.submitJobApplicationSuccess]: (
      state,
      action
    ) => ({
      ...state,
      ...action.payload,
    }),
    [JobApplicationActionEnums.submitJobApplicationError]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [JobApplicationActionEnums.resetStateFlagsAction]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
  },
  INITIAL_STATE
);
