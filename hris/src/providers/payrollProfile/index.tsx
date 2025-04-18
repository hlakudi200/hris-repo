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
  resetStateFlagsAction,
} from "./actions";

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

  const resetStateFlags = () => {
    dispatch(resetStateFlagsAction());
  };

  return (
    <PayrollStateContext.Provider value={state}>
      <PayrollActionContext.Provider value={{ getAllNamed, resetStateFlags }}>
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
