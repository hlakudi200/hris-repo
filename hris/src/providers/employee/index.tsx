"use client";

import { useContext, useReducer } from "react";
import { EmployeeReducer } from "./reducer";
import {
  EmployeeActionContext,
  EmployeeStateContext,
  INITIAL_STATE,
} from "./context";
import {
  getEmployeeError,
  getEmployeePending,
  getEmployeeSuccess,
  getLeavesError,
  getLeavesPending,
  getLeavesSuccess,
} from "./actions";
import { getAxiosInstace } from "@/utils/axios-instance";

export const EmployeeProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, dispatch] = useReducer(EmployeeReducer, INITIAL_STATE);
  const instance = getAxiosInstace();

  const getEmployee = async (employeeId: string) => {
    dispatch(getEmployeePending());

    //TODO: Add endpoint
    const endpoint: string = ``;

    await instance
      .post(endpoint, employeeId)
      .then((response) => {
        dispatch(getEmployeeSuccess(response.data));
      })
      .catch((error) => {
        console.error(error);
        dispatch(getEmployeeError());
      });
  };

  const getLeaves = async (employeeId: string) => {
    dispatch(getLeavesPending());

    //TODO: Add endpoint
    const endpoint: string = ``;

    await instance
      .post(endpoint, employeeId)
      .then((response) => {
        dispatch(getLeavesSuccess(response.data));
      })
      .catch((error) => {
        console.error(error);
        dispatch(getLeavesError());
      });
  };

  return (
    <EmployeeStateContext.Provider value={state}>
      <EmployeeActionContext.Provider value={{ getEmployee, getLeaves }}>
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
