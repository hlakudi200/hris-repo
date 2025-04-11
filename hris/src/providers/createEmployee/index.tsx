"use client";

import { useContext, useReducer } from "react";
import { EmployeeReducer } from "./reducer";
import {
  EmployeeActionContext,
  EmployeeStateContext,
  INITIAL_STATE,
  ICreateEmployeeRequest,
} from "./context";
import {
  getEmployeeError,
  getEmployeePending,
  getEmployeeSuccess,
  createEmployeeError,
  createEmployeePending,
  createEmployeeSuccess,
} from "./actions";
import axios from "axios";

// Create axios instance with default configuration
const axiosInstance = axios.create({
  baseURL: "https://localhost:44311",
  headers: {
    "Content-Type": "application/json",
  },
});

export const CreateEmployeeProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, dispatch] = useReducer(EmployeeReducer, INITIAL_STATE);

  const getEmployee = async (employeeNumber: string) => {
    dispatch(getEmployeePending());

    const endpoint = `/api/services/app/Employee/Get?employeeNumber=${employeeNumber}`;

    try {
      const response = await axiosInstance.get(endpoint);
      dispatch(getEmployeeSuccess(response.data.result));
    } catch (error) {
      console.error("Error fetching employee:", error);
      dispatch(getEmployeeError(error.message || "Failed to fetch employee"));
    }
  };

  const createEmployee = async (employee: ICreateEmployeeRequest) => {
    dispatch(createEmployeePending());

    const endpoint = "/api/services/app/Employee/Create";

    try {
      const response = await axiosInstance.post(endpoint, employee);
      dispatch(createEmployeeSuccess(response.data.result));
    } catch (error) {
      console.error("Error creating employee:", error);
      dispatch(
        createEmployeeError(error.message || "Failed to create employee")
      );
    }
  };

  return (
    <EmployeeStateContext.Provider value={state}>
      <EmployeeActionContext.Provider value={{ getEmployee, createEmployee }}>
        {children}
      </EmployeeActionContext.Provider>
    </EmployeeStateContext.Provider>
  );
};

export const useEmployeeState = () => {
  const context = useContext(EmployeeStateContext);
  if (!context) {
    throw new Error("useEmployeeState must be used within an EmployeeProvider");
  }
  return context;
};

export const useEmployeeActions = () => {
  const context = useContext(EmployeeActionContext);
  if (!context) {
    throw new Error(
      "useEmployeeActions must be used within an EmployeeProvider"
    );
  }
  return context;
};
