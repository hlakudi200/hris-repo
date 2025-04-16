import { handleActions } from "redux-actions";
import { INITIAL_STATE, IInterviewStateContext } from "./context";
import { InterviewActionEnums } from "./actions";

export const InterviewReducer = handleActions<IInterviewStateContext>(
  {
    // Create interview reducers
    [InterviewActionEnums.createInterviewPending]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [InterviewActionEnums.createInterviewSuccess]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [InterviewActionEnums.createInterviewError]: (state, action) => ({
      ...state,
      ...action.payload,
    }),

    // Get interview reducers
    [InterviewActionEnums.getInterviewPending]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [InterviewActionEnums.getInterviewSuccess]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [InterviewActionEnums.getInterviewError]: (state, action) => ({
      ...state,
      ...action.payload,
    }),

    // Get all interviews reducers
    [InterviewActionEnums.getAllInterviewsPending]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [InterviewActionEnums.getAllInterviewsSuccess]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [InterviewActionEnums.getAllInterviewsError]: (state, action) => ({
      ...state,
      ...action.payload,
    }),

    // Get interviews by job application reducers
    [InterviewActionEnums.getInterviewsByJobApplicationPending]: (
      state,
      action
    ) => ({
      ...state,
      ...action.payload,
    }),
    [InterviewActionEnums.getInterviewsByJobApplicationSuccess]: (
      state,
      action
    ) => ({
      ...state,
      ...action.payload,
    }),
    [InterviewActionEnums.getInterviewsByJobApplicationError]: (
      state,
      action
    ) => ({
      ...state,
      ...action.payload,
    }),

    // Update interview reducers
    [InterviewActionEnums.updateInterviewPending]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [InterviewActionEnums.updateInterviewSuccess]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [InterviewActionEnums.updateInterviewError]: (state, action) => ({
      ...state,
      ...action.payload,
    }),

    // Delete interview reducers
    [InterviewActionEnums.deleteInterviewPending]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [InterviewActionEnums.deleteInterviewSuccess]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [InterviewActionEnums.deleteInterviewError]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
  },
  INITIAL_STATE
);
