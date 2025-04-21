import { createAction } from "redux-actions";
import { INamedPayrollProfile, IPayrollStateContext } from "./context";

export enum PayrollActionEnums {
  getAllNamedPending = "GET_ALL_NAMED_PENDING",
  getAllNamedSuccess = "GET_ALL_NAMED_SUCCESS",
  getAllNamedError = "GET_ALL_NAMED_ERROR",

  getPayrollProfilePending = "GET_PAYROLL_PROFILE_PENDING",
  getPayrollProfileSuccess = "GET_PAYROLL_PROFILE_SUCCESS",
  getPayrollProfileError = "GET_PAYROLL_PROFILE_ERROR",

  resetStateFlagsAction = "RESET_STATE_FLAGS",
}

//Get payroll trasactions
export const getAllNamedPending = createAction<IPayrollStateContext>(
  PayrollActionEnums.getAllNamedPending,
  () => ({ isPending: true, isSuccess: false, isError: false })
);

export const getAllNamedSuccess = createAction<
  IPayrollStateContext,
  INamedPayrollProfile[]
>(
  PayrollActionEnums.getAllNamedSuccess,
  (namedPayrollProfiles: INamedPayrollProfile[]) => ({
    isPending: false,
    isSuccess: true,
    isError: false,
    namedPayrollProfiles,
  })
);
export const getAllNamedError = createAction<IPayrollStateContext>(
  PayrollActionEnums.getAllNamedError,
  () => ({ isPending: false, isSuccess: false, isError: true })
);

//GET Payrollprofile
export const getPayrollProfilePending = createAction<IPayrollStateContext>(
  PayrollActionEnums.getPayrollProfilePending,
  () => ({ isPending: true, isSuccess: false, isError: false })
);

export const getPayrollProfileSuccess = createAction<
  IPayrollStateContext,
  INamedPayrollProfile
>(
  PayrollActionEnums.getPayrollProfileSuccess,
  (  PayrollProfile: INamedPayrollProfile) => ({
    isPending: false,
    isSuccess: true,
    isError: false,
    PayrollProfile,
  })
);
export const getPayrollProfileError = createAction<IPayrollStateContext>(
  PayrollActionEnums.getPayrollProfileError,
  () => ({ isPending: false, isSuccess: false, isError: true })
);




export const resetStateFlagsAction = createAction<IPayrollStateContext>(
  PayrollActionEnums.resetStateFlagsAction,
  () => ({ isPending: false, isSuccess: false, isError: false })
);
