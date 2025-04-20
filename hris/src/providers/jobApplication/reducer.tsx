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

    [JobApplicationActionEnums.getJobApplicationsPending]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [JobApplicationActionEnums.getJobApplicationsSuccess]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [JobApplicationActionEnums.getJobApplicationsError]: (state, action) => ({
      ...state,
      ...action.payload,
    }),

    //update job application
    [JobApplicationActionEnums.UpdateJobApplicationPending]: (
      state,
      action
    ) => ({
      ...state,
      ...action.payload,
    }),
    [JobApplicationActionEnums.UpdateJobApplicationSuccess]: (
      state,
      action
    ) => ({
      ...state,
      ...action.payload,
    }),
    [JobApplicationActionEnums.UpdateJobApplicationError]: (state, action) => ({
      ...state,
      ...action.payload,
    }),

    [JobApplicationActionEnums.getJobApplicationByIdPending]: (
      state,
      action
    ) => ({
      ...state,
      ...action.payload,
    }),
    [JobApplicationActionEnums.getJobApplicationByIdSuccess]: (
      state,
      action
    ) => ({
      ...state,
      ...action.payload,
    }),
    [JobApplicationActionEnums.getJobApplicationByIdError]: (
      state,
      action
    ) => ({
      ...state,
      ...action.payload,
    }),
  },
  INITIAL_STATE
);
