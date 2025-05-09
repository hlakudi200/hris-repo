import { createAction } from "redux-actions";
import { IEmployee, IEmployeeStateContext, IPayrollProfile } from "./context";

export enum EmployeeActionEnums {
  createEmployeePending = "CREATE_EMPLOYEE_PENDING",
  createEmployeeSuccess = "CREATE_EMPLOYEE_SUCCESS",
  createEmployeeError = "CREATE_EMPLOYEE_ERROR",

  getEmployeePending = "GET_EMPLOYEE_PENDING",
  getEmployeeSuccess = "GET_EMPLOYEE_SUCCESS",
  getEmployeeError = "GET_EMPLOYEE_ERROR",

  updateEmployeePending = "UPDATE_EMPLOYEE_PENDING",
  updateEmployeeSuccess = "UPDATE_EMPLOYEE_SUCCESS",
  updateEmployeeError = "UPDATE_EMPLOYEE_ERROR",

  getPayrollProfilePending = "GET_PAYROLL_PROFILE_PENDING",
  getPayrollProfileSuccess = "GET_PAYROLL_PROFILE_SUCCESS",
  getPayrollProfileError = "GET_PAYROLL_PROFILE_ERROR",

  getAllEmployeesPending = "GET_ALL_EMPLOYEES_PENDING",
  getAllEmployeesSuccess = "GET_ALL_EMPLOYEES_SUCCESS",
  getAllEmployeesError = "GET_ALL_EMPLOYEES_ERROR",

  deleteEmployeePending = "DELETE_EMPLOYEE_PENDING",
  deleteEmployeeSuccess = "DELETE_EMPLOYEE_SUCCESS",
  deleteEmployeeError = "DELETE_EMPLOYEE_ERROR",
}

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

// Creating actions for updateEmployee statuses
export const updateEmployeePending = createAction<IEmployeeStateContext>(
  EmployeeActionEnums.updateEmployeePending,
  () => ({ isPending: true, isSuccess: false, isError: false })
);
export const updateEmployeeSuccess = createAction<
  IEmployeeStateContext,
  IEmployee
>(EmployeeActionEnums.updateEmployeeSuccess, (currentEmployee: IEmployee) => ({
  isPending: false,
  isSuccess: true,
  isError: false,
  currentEmployee,
}));
export const updateEmployeeError = createAction<IEmployeeStateContext, string>(
  EmployeeActionEnums.updateEmployeeError,
  (errorMessage: string) => ({
    isPending: false,
    isSuccess: false,
    isError: true,
    errorMessage,
  })
);

export const getPayrollProfilePending = createAction<IEmployeeStateContext>(
  EmployeeActionEnums.getPayrollProfilePending,
  () => ({ isPending: true, isSuccess: false, isError: false })
);
export const getPayrollProfileSuccess = createAction<
  IEmployeeStateContext,
  IPayrollProfile
>(
  EmployeeActionEnums.getPayrollProfileSuccess,
  (payrollProfile: IPayrollProfile) => ({
    isPending: false,
    isSuccess: true,
    isError: false,
    payrollProfile,
  })
);
export const getPayrollProfileError = createAction<IEmployeeStateContext>(
  EmployeeActionEnums.getPayrollProfileError,
  () => ({ isPending: false, isSuccess: false, isError: true })
);

// New actions for getAllEmployees
export const getAllEmployeesPending = createAction<IEmployeeStateContext>(
  EmployeeActionEnums.getAllEmployeesPending,
  () => ({ isPending: true, isSuccess: false, isError: false })
);

export const getAllEmployeesSuccess = createAction<
  IEmployeeStateContext,
  IEmployee[]
>(EmployeeActionEnums.getAllEmployeesSuccess, (employees: IEmployee[]) => ({
  isPending: false,
  isSuccess: true,
  isError: false,
  employees,
}));

export const getAllEmployeesError = createAction<IEmployeeStateContext, string>(
  EmployeeActionEnums.getAllEmployeesError,
  (errorMessage: string) => ({
    isPending: false,
    isSuccess: false,
    isError: true,
    errorMessage,
  })
);

// New actions for deleteEmployee
export const deleteEmployeePending = createAction<IEmployeeStateContext>(
  EmployeeActionEnums.deleteEmployeePending,
  () => ({ isPending: true, isSuccess: false, isError: false })
);

export const deleteEmployeeSuccess = createAction<IEmployeeStateContext>(
  EmployeeActionEnums.deleteEmployeeSuccess,
  () => ({
    isPending: false,
    isSuccess: true,
    isError: false,
  })
);

export const deleteEmployeeError = createAction<IEmployeeStateContext, string>(
  EmployeeActionEnums.deleteEmployeeError,
  (errorMessage: string) => ({
    isPending: false,
    isSuccess: false,
    isError: true,
    errorMessage,
  })
);
