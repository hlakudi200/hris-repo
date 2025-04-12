import { ILeaveRequest, ILeaveRequestStateContext } from "./context";
import { createAction } from "redux-actions";

export enum LeaveRequestActionEnums {
  submitLeaveRequestPending = "SUBMIT_LEAVE_REQUEST_USER_PENDING",
  submitLeaveRequestSuccess = "SUBMIT_LEAVE_REQUEST_SUCCESS",
  submitLeaveRequestError = "SUBMIT_LEAVE_REQUEST_ERROR",
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
