import { ILeaveRequest, ILeaveRequestStateContext } from "./context";
import { createAction } from "redux-actions";

export enum LeaveRequestActionEnums {
  submitLeaveRequestPending = "SUBMIT_LEAVE_REQUEST_USER_PENDING",
  submitLeaveRequestSuccess = "SUBMIT_LEAVE_REQUEST_SUCCESS",
  submitLeaveRequestError = "SUBMIT_LEAVE_REQUEST_ERROR",

  getLeaveRequestByEmpIdPending = "GET_LEAVE_REQUEST_BY_EMP_ID_PENDING",
  getLeaveRequestByEmpIdSuccess = "GET_LEAVE_REQUEST_BY_EMP_ID_SUCCESS",
  getLeaveRequestByEmpIdError = "GET_LEAVE_REQUEST_BY_EMP_ID_ERROR",

  updateLeaveRequestPending = "UPDATE_LEAVE_REQUEST_PENDING",
  updateLeaveRequestSuccess = "UPDATE_LEAVE_REQUEST_SUCCESS",
  updateLeaveRequestError = "UPDATE_LEAVE_REQUEST_ERROR",

  getLeaveRequestsPending = "GET_LEAVE_REQUESTS_PENDING",
  getLeaveRequestsSuccess = "GET_LEAVE_REQUESTS_SUCCESS",
  getLeaveRequestsError = "GET_LEAVE_REQUESTS_ERROR",

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
//UPDATE LEAVE QUEST 
export const updateLeaveRequestPending =
  createAction<ILeaveRequestStateContext>(
    LeaveRequestActionEnums.updateLeaveRequestPending,
    () => ({ isPending: true, isSuccess: false, isError: false })
  );
export const updateLeaveRequestSuccess = createAction<
  ILeaveRequestStateContext,
  ILeaveRequest
>(
  LeaveRequestActionEnums.updateLeaveRequestSuccess,
  (request: ILeaveRequest) => ({
    isPending: false,
    isSuccess: true,
    isError: false,
    request,
  })
);
export const updateLeaveRequestError = createAction<ILeaveRequestStateContext>(
  LeaveRequestActionEnums.updateLeaveRequestError,
  () => ({ isPending: false, isSuccess: false, isError: true })
);

//GET LEAVE REQUESTS
export const getLeaveRequestsPending = createAction<ILeaveRequestStateContext>(
  LeaveRequestActionEnums.getLeaveRequestsPending,
  () => ({ isPending: true, isSuccess: false, isError: false })
);
export const getLeaveRequestsSuccess = createAction<
  ILeaveRequestStateContext,
  ILeaveRequest[]
>(
  LeaveRequestActionEnums.getLeaveRequestByEmpIdSuccess,
  (leaveRequests: ILeaveRequest[]) => ({
    isPending: false,
    isSuccess: true,
    isError: false,
    leaveRequests,
  })
);
export const getLeaveRequestsError = createAction<ILeaveRequestStateContext>(
  LeaveRequestActionEnums.getLeaveRequestsError,
  () => ({ isPending: false, isSuccess: false, isError: true })
);

//GET LEAVE REQUEST BY ID

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
