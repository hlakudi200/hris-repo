import { createAction } from "redux-actions";
import { IEmployee, IEmployeeStateContext, ILeaves } from "./context";

export enum EmployeeActionEnums {
  getEmployeePending = "GET_EMPLOYEE_PENDING",
  getEmployeeSuccess = "GET_EMPLOYEE_SUCCESS",
  getEmployeeError = "GET_EMPLOYEE_ERROR",

  getLeavesPending = "GET_LEAVES_PENDING",
  getLeavesSuccess = "GET_LEAVES_SUCCESS",
  getLeavesError = "GET_LEAVES_ERROR",
}

// Creating actions for getEmployee statuses
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
export const getEmployeeError = createAction<IEmployeeStateContext>(
  EmployeeActionEnums.getEmployeeError,
  () => ({ isPending: false, isSuccess: false, isError: true })
);

// Creating actions for getLeaves statuses
export const getLeavesPending = createAction<IEmployeeStateContext>(
  EmployeeActionEnums.getLeavesPending,
  () => ({ isPending: true, isSuccess: false, isError: false })
);
export const getLeavesSuccess = createAction<IEmployeeStateContext, ILeaves>(
  EmployeeActionEnums.getLeavesSuccess,
  (leaves: ILeaves) => ({
    isPending: false,
    isSuccess: true,
    isError: false,
    leaves,
  })
);
export const getLeavesError = createAction<IEmployeeStateContext>(
  EmployeeActionEnums.getLeavesError,
  () => ({ isPending: false, isSuccess: false, isError: true })
);
