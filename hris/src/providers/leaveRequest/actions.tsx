import { ILeaveRequest, ILeaveRequestStateContext } from "./context";
import { createAction } from "redux-actions";

export enum LeaveRequestActionEnums {
  submitLeaveRequestPending = "SUBMIT_LEAVE_REQUEST_USER_PENDING",
  submitLeaveRequestSuccess = "SUBMIT_LEAVE_REQUEST_SUCCESS",
  submitLeaveRequestError = "SUBMIT_LEAVE_REQUEST_ERROR",

  getLeaveRequestByEmpIdPending = "GET_LEAVE_REQUEST_BY_EMP_ID_PENDING",
  getLeaveRequestByEmpIdSuccess = "GET_LEAVE_REQUEST_BY_EMP_ID_SUCCESS",
  getLeaveRequestByEmpIdError = "GET_LEAVE_REQUEST_BY_EMP_ID_ERROR",

  resetStateFlagsAction = "RESET_STATE_FLAGS",
}

export const submitLeaveRequestPending =
  createAction<ILeaveRequestStateContext>(
    LeaveRequestActionEnums.submitLeaveRequestPending,
    () => ({ isPending: true, isSuccess: false, isError: false })
  );
export const submitLeaveRequestSuccess = createAction<
  ILeaveRequestStateContext,
  ILeaveRequest
>(
  LeaveRequestActionEnums.submitLeaveRequestSuccess,
  (request: ILeaveRequest) => ({
    isPending: false,
    isSuccess: true,
    isError: false,
    request,
  })
);
export const submitLeaveRequestError = createAction<ILeaveRequestStateContext>(
  LeaveRequestActionEnums.submitLeaveRequestError,
  () => ({ isPending: false, isSuccess: false, isError: true })
);

export const getLeaveRequestByEmpIdPending =
  createAction<ILeaveRequestStateContext>(
    LeaveRequestActionEnums.getLeaveRequestByEmpIdPending,
    () => ({ isPending: true, isSuccess: false, isError: false })
  );
export const getLeaveRequestByEmpIdSuccess = createAction<
  ILeaveRequestStateContext,
  ILeaveRequest
>(
  LeaveRequestActionEnums.getLeaveRequestByEmpIdSuccess,
  (leaveRequests: ILeaveRequest[]) => ({
    isPending: false,
    isSuccess: true,
    isError: false,
    leaveRequests,
  })
);
export const getLeaveRequestByEmpIdError =
  createAction<ILeaveRequestStateContext>(
    LeaveRequestActionEnums.getLeaveRequestByEmpIdError,
    () => ({ isPending: false, isSuccess: false, isError: true })
  );

export const resetStateFlagsAction = createAction<ILeaveRequestStateContext>(
  LeaveRequestActionEnums.resetStateFlagsAction,
  () => ({ isPending: false, isSuccess: false, isError: false })
);
