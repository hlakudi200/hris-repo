import { handleActions } from "redux-actions";
import { ILeaveRequestStateContext, INITIAL_STATE } from "./context";
import { LeaveRequestActionEnums } from "./actions";

export const LeaveRequestReducer = handleActions<ILeaveRequestStateContext>(
  {
    [LeaveRequestActionEnums.submitLeaveRequestPending]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [LeaveRequestActionEnums.submitLeaveRequestSuccess]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [LeaveRequestActionEnums.submitLeaveRequestError]: (state, action) => ({
      ...state,
      ...action.payload,
    }),

    [LeaveRequestActionEnums.getLeaveRequestByEmpIdPending]: (
      state,
      action
    ) => ({
      ...state,
      ...action.payload,
    }),
    [LeaveRequestActionEnums.getLeaveRequestByEmpIdSuccess]: (
      state,
      action
    ) => ({
      ...state,
      ...action.payload,
    }),
    [LeaveRequestActionEnums.getLeaveRequestByEmpIdError]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [LeaveRequestActionEnums.resetStateFlagsAction]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
  },
  INITIAL_STATE
);
