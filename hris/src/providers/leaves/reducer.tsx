import { handleActions } from "redux-actions";
import { LeavesActionEnums } from "./actions";
import { ILeavesStateContext, INITIAL_STATE } from "./context";

export const LeaveReducer = handleActions<ILeavesStateContext>(
  {
    [LeavesActionEnums.getLeavesPending]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [LeavesActionEnums.getLeavesSuccess]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [LeavesActionEnums.getLeavesError]: (state, action) => ({
      ...state,
      ...action.payload,
    }),

    [LeavesActionEnums.updateLeavesPending]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [LeavesActionEnums.updateLeavesSuccess]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [LeavesActionEnums.updateLeavesError]: (state, action) => ({
      ...state,
      ...action.payload,
    }),

    [LeavesActionEnums.getAllLeavesPending]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [LeavesActionEnums.getAllLeavesSuccess]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [LeavesActionEnums.getAllLeavesError]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    
    [LeavesActionEnums.resetStateFlagsAction]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
  },
  INITIAL_STATE
);
