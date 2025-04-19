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
  getPayrollTransactionError,
  getPayrollTransactionSuccess,
  getPayrollTransactionPending,
  sentPaySlipsPending,
  sentPaySlipSuccess,
  sentPaySlipsSuccess,
  sentPaySlipsError,
  sentPaySlipPending,
  sentPaySlipError,
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

 

  const createPayrollTransaction = async (transaction: IPayrollTransaction) => {
    const endpoint = `/api/services/app/PayrollTransaction/Create`;
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

  const getAllTrasactions = async () => {
    dispatch(getPayrollTransactionPending());
    const endpoint = `/api/services/app/PayrollTransaction/GetAll`;
    await instance
      .get(endpoint)
      .then((response) => {
        dispatch(getPayrollTransactionSuccess(response.data.result.items));
      })
      .catch((err) => {
        getPayrollTransactionError()
        console.log("getPayrollTrasactions:", err);
      });
  };

  const sentPaySlips = async (date:Date) => {
    dispatch(sentPaySlipsPending());
  const  endpoint =`/api/payroll/send-payslip-email/${date}`

    instance
      .post(endpoint)
      .then((response) => {
        if (response.status === 200) {
          dispatch(sentPaySlipsSuccess());
        }
      })
      .catch((error) => {
        console.error(error);
        dispatch(sentPaySlipsError());
      });
  };

  const sentPaySlip = async (id:string) => {
    dispatch(sentPaySlipPending());
  const  endpoint =`/api/payroll/send-payslips-for-date?id=${id}`

    instance
      .post(endpoint)
      .then((response) => {
        if (response.status === 200) {
          dispatch(sentPaySlipSuccess());
        }
      })
      .catch((error) => {
        console.error(error);
        dispatch(sentPaySlipError());
      });
  };

  const resetStateFlags = async () => {
    dispatch(resetStateFlagsAction());
  };

  return (
    <PayrollTransactionStateContext.Provider value={state}>
      <PayrollTransactionActionContext.Provider
        value={{
          createPayrollTransaction,
          resetStateFlags,
          getAllTrasactions,
          sentPaySlip,
          sentPaySlips
        }}
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
