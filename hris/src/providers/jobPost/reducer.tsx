import { handleActions } from "redux-actions";
import { INITIAL_STATE, IJobPostingStateContext } from "./context";
import { JobPostingActionEnums } from "./actions";

export const JobPostingReducer = handleActions<
  IJobPostingStateContext,
  IJobPostingStateContext
>(
  {
    [JobPostingActionEnums.getJobPostingsPending]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [JobPostingActionEnums.getJobPostingsSuccess]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [JobPostingActionEnums.getJobPostingsError]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [JobPostingActionEnums.getJobPostingPending]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [JobPostingActionEnums.getJobPostingSuccess]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [JobPostingActionEnums.getJobPostingError]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [JobPostingActionEnums.createJobPostingPending]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [JobPostingActionEnums.createJobPostingSuccess]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [JobPostingActionEnums.createJobPostingError]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [JobPostingActionEnums.updateJobPostingPending]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [JobPostingActionEnums.updateJobPostingSuccess]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [JobPostingActionEnums.updateJobPostingError]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [JobPostingActionEnums.deleteJobPostingPending]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [JobPostingActionEnums.deleteJobPostingSuccess]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [JobPostingActionEnums.deleteJobPostingError]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
  },
  INITIAL_STATE
);
