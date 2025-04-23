import { createAction } from "redux-actions";
import { ILeaves, ILeavesStateContext } from "./context";

export enum LeavesActionEnums {
  getLeavesPending = "GET_LEAVES_PENDING",
  getLeavesSuccess = "GET_LEAVES_SUCCESS",
  getLeavesError = "GET_LEAVES_ERROR",

  updateLeavesPending = "UPDATE_LEAVES_PENDING",
  updateLeavesSuccess = "UPDATE_LEAVES_SUCCESS",
  updateLeavesError = "UPDATE_LEAVES_ERROR",

  getAllLeavesPending = "GET_ALL_LEAVES_PENDING",
  getAllLeavesSuccess = "GET_ALL_LEAVES_SUCCESS",
  getAllLeavesError = "GET_ALL_LEAVES_ERROR",

  resetStateFlagsAction = "RESET_STATE_FLAGS",
}

export const getLeavesPending = createAction<ILeavesStateContext>(
  LeavesActionEnums.getLeavesPending,
  () => ({ isPending: true, isSuccess: false, isError: false })
);
export const getLeavesSuccess = createAction<ILeavesStateContext, ILeaves>(
  LeavesActionEnums.getLeavesSuccess,
  (leaves: ILeaves) => ({
    isPending: false,
    isSuccess: true,
    isError: false,
    leaves,
  })
);
export const getLeavesError = createAction<ILeavesStateContext>(
  LeavesActionEnums.getLeavesError,
  () => ({ isPending: false, isSuccess: false, isError: true })
);

export const updateLeavesPending = createAction<ILeavesStateContext>(
  LeavesActionEnums.updateLeavesPending,
  () => ({ isPending: true, isSuccess: false, isError: false })
);
export const updateLeavesSuccess = createAction<ILeavesStateContext, ILeaves>(
  LeavesActionEnums.updateLeavesSuccess,
  (leaves: ILeaves) => ({
    isPending: false,
    isSuccess: true,
    isError: false,
    leaves,
  })
);
export const updateLeavesError = createAction<ILeavesStateContext>(
  LeavesActionEnums.updateLeavesError,
  () => ({ isPending: false, isSuccess: false, isError: true })
);

export const getAllLeavesPending = createAction<ILeavesStateContext>(
  LeavesActionEnums.getAllLeavesPending,
  () => ({ isPending: true, isSuccess: false, isError: false })
);
export const getAllLeavesSuccess = createAction<ILeavesStateContext, ILeaves>(
  LeavesActionEnums.getAllLeavesSuccess,
  (leavesList: ILeaves[]) => ({
    isPending: false,
    isSuccess: true,
    isError: false,
    leavesList,
  })
);
export const getAllLeavesError = createAction<ILeavesStateContext>(
  LeavesActionEnums.getAllLeavesError,
  () => ({ isPending: false, isSuccess: false, isError: true })
);

export const resetStateFlagsAction = createAction<ILeavesStateContext>(
  LeavesActionEnums.resetStateFlagsAction,
  () => ({ isPending: false, isSuccess: false, isError: false })
);
