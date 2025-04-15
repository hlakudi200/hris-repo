"use client";
import { getAxiosInstace } from "@/utils/axios-instance";
import { PayrollTransactionReducer } from "./reducer";
import { useContext, useReducer } from "react";
import {
  IPayrollTransaction,
  INITIAL_STATE,
  PayrollTransactionActionContext,
  PayrollTransactionStateContext,
} from "@/providers/payrolltransaction/context";
import {
  resetStateFlagsAction,
  createPayrollTransactionError,
  createPayrollTransactionPending,
  createPayrollTransactionSuccess,
} from "./actions";

export const PayrollTransactionProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, dispatch] = useReducer(
    PayrollTransactionReducer,
    INITIAL_STATE
  );
  const instance = getAxiosInstace();

  const endpoint = `/api/services/app/PayrollTransaction/Create`;

  const createPayrollTransaction = async (transaction: IPayrollTransaction) => {
    dispatch(createPayrollTransactionPending());

    // Only send the fields that the user will input, backend will calculate the rest
    const payload = {
      payrollProfileId: transaction.payrollProfileId,
      periodStart: transaction.periodStart,
      periodEnd: transaction.periodEnd,
      grossAmount: transaction.grossAmount,
      isPaid: transaction.isPaid,
    };

    instance
      .post(endpoint, payload)
      .then((response) => {
        if (response.status === 200) {
          // Use the response data which should include calculated tax and net amounts
          dispatch(createPayrollTransactionSuccess(response.data.result));
        }
      })
      .catch((error) => {
        console.error(error);
        dispatch(createPayrollTransactionError());
      });
  };

  const resetStateFlags = async () => {
    dispatch(resetStateFlagsAction());
  };

  return (
    <PayrollTransactionStateContext.Provider value={state}>
      <PayrollTransactionActionContext.Provider
        value={{ createPayrollTransaction, resetStateFlags }}
      >
        {children}
      </PayrollTransactionActionContext.Provider>
    </PayrollTransactionStateContext.Provider>
  );
};

export const usePayrollTransactionState = () => {
  const context = useContext(PayrollTransactionStateContext);
  if (!context) {
    throw new Error(
      "usePayrollTransactionState must be used within a PayrollTransactionProvider"
    );
  }
  return context;
};

export const usePayrollTransactionActions = () => {
  const context = useContext(PayrollTransactionActionContext);
  if (!context) {
    throw new Error(
      "usePayrollTransactionActions must be used within a PayrollTransactionProvider"
    );
  }
  return context;
};
