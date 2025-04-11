import { createAction } from "redux-actions";
import { IEmployee, IEmployeeStateContext } from "./context";

export enum EmployeeActionEnums {
  getEmployeePending = "GET_EMPLOYEE_PENDING",
  getEmployeeSuccess = "GET_EMPLOYEE_SUCCESS",
  getEmployeeError = "GET_EMPLOYEE_ERROR",

  createEmployeePending = "CREATE_EMPLOYEE_PENDING",
  createEmployeeSuccess = "CREATE_EMPLOYEE_SUCCESS",
  createEmployeeError = "CREATE_EMPLOYEE_ERROR",
}

export const getEmployeePending = createAction<IEmployeeStateContext>(
  EmployeeActionEnums.getEmployeePending,
  () => ({ isPending: true, isSuccess: false, isError: false })
);

export const getEmployeeSuccess = createAction<
  IEmployeeStateContext,
  IEmployee
>(EmployeeActionEnums.getEmployeeSuccess, (currentEmployee: IEmployee) => ({
  isPending: false,
  isSuccess: true,
  isError: false,
  currentEmployee,
}));

export const getEmployeeError = createAction<IEmployeeStateContext, string>(
  EmployeeActionEnums.getEmployeeError,
  (errorMessage: string) => ({
    isPending: false,
    isSuccess: false,
    isError: true,
    errorMessage,
  })
);

export const createEmployeePending = createAction<IEmployeeStateContext>(
  EmployeeActionEnums.createEmployeePending,
  () => ({ isPending: true, isSuccess: false, isError: false })
);

export const createEmployeeSuccess = createAction<
  IEmployeeStateContext,
  IEmployee
>(EmployeeActionEnums.createEmployeeSuccess, (currentEmployee: IEmployee) => ({
  isPending: false,
  isSuccess: true,
  isError: false,
  currentEmployee,
}));

export const createEmployeeError = createAction<IEmployeeStateContext, string>(
  EmployeeActionEnums.createEmployeeError,
  (errorMessage: string) => ({
    isPending: false,
    isSuccess: false,
    isError: true,
    errorMessage,
  })
);
