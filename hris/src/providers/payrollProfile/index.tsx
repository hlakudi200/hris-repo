"use client";

import { useContext, useReducer } from "react";
import { PayrollReducer } from "./reducer";
import {
  INITIAL_STATE,
  PayrollActionContext,
  PayrollStateContext,
} from "./context";
import { getAxiosInstace } from "@/utils/axios-instance";
import {
  getAllNamedError,
  getAllNamedPending,
  getAllNamedSuccess,
  getPayrollProfileSuccess,
  resetStateFlagsAction,
} from "./actions";
import { getPayrollProfilePending } from "../employee/actions";

export const PayrollProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, dispatch] = useReducer(PayrollReducer, INITIAL_STATE);
  const instance = getAxiosInstace();

  const getAllNamed = async () => {
    dispatch(getAllNamedPending());
    const endpoint: string = "/api/services/app/PayrollProfile/GetAllNamed";

    await instance
      .get(endpoint)
      .then((response) => {
        if (response.status === 200) {
          dispatch(getAllNamedSuccess(response.data.result));
        }
      })
      .catch((error) => {
        console.error(error);
        dispatch(getAllNamedError());
      });
  };

  const getPayrollProfileById = async (id: string) => {
    dispatch(getPayrollProfilePending());

    const endpoint: string = `/api/services/app/PayrollProfile/GetByEmpId?empId=${id}`;
    await instance
      .get(endpoint)
      .then((response) => {
 
        if (response.status === 200) {
          dispatch(getPayrollProfileSuccess(response.data.result));
          console.log("PayrollProfile:",response.data.result)
        }
      })
      .catch((error) => {
        console.error("Error:",error);
        dispatch(getAllNamedError());
      });
  };
  const resetStateFlags = () => {
    dispatch(resetStateFlagsAction());
  };

  return (
    <PayrollStateContext.Provider value={state}>
      <PayrollActionContext.Provider
        value={{getAllNamed, resetStateFlags, getPayrollProfileById }}
      >
        {children}
      </PayrollActionContext.Provider>
    </PayrollStateContext.Provider>
  );
};

export const usePayrollState = () => {
  const context = useContext(PayrollStateContext);
  if (!context) {
    throw new Error("usePayrollState must be used within a PayrollProvider");
  }
  return context;
};

export const usePayrollActions = () => {
  const context = useContext(PayrollActionContext);
  if (!context) {
    throw new Error("usePayrollActions must be used within a PayrollProvider");
  }
  return context;
};
