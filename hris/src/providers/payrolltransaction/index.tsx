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
  generatePayrollTransactionPdfPending,
  generatePayrollTransactionPdfSuccess,
  generatePayrollTransactionPdfError,
  downloadPayrollTransactionPdfPending,
  downloadPayrollTransactionPdfSuccess,
  downloadPayrollTransactionPdffError,
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
        getPayrollTransactionError();
        console.error(err);
      });
  };

  //Generate Pdf
  const generatePayrollTransactionPdf = async (
    payrollTransactionId: string
  ) => {
    dispatch(generatePayrollTransactionPdfPending());
    const endpoint = `/api/services/app/PayrollTransaction/GeneratePayrollPdf?id=${payrollTransactionId}`;
    await instance
      .post(endpoint)
      .then(() => {
        dispatch(generatePayrollTransactionPdfSuccess());
        downloadPayrollTransactionPdf(payrollTransactionId);
      })
      .catch((error) => {
        console.error(error);
        dispatch(generatePayrollTransactionPdfError());
      });
  };

  //Download Pdf
  const downloadPayrollTransactionPdf = async (id: string) => {
    dispatch(downloadPayrollTransactionPdfPending());
    const endpoint: string = `/api/payroll/download-pdf/${id}`;

    try {
      const response = await instance.get(endpoint);

      if (response.status === 200) {
        const result = response.data.result;
        const byteCharacters = atob(result.fileBytes);
        const byteNumbers = new Array(byteCharacters.length);

        for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
        }

        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], { type: result.contentType });

        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = result.fileName;
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(url);

        dispatch(downloadPayrollTransactionPdfSuccess());
      }
    } catch (error) {
      console.error("Download error:", error);
      dispatch(downloadPayrollTransactionPdffError());
    }
  };

  const sentPaySlips = async (date: Date) => {
    dispatch(sentPaySlipsPending());
    const endpoint = `/api/payroll/send-payslips-for-date?id=${date}`;

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

  const sentPaySlip = async (id: string) => {
    dispatch(sentPaySlipPending());

    const endpoint = `/api/payroll/send-payslip-email/${id}`;

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

          downloadPayrollTransactionPdf,
          generatePayrollTransactionPdf,
          sentPaySlip,
          sentPaySlips,
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
