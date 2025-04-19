import {
  IPayrollTransaction,
  IPayrollTransactionStateContext,
} from "@/providers/payrolltransaction/context";

import { createAction } from "redux-actions";

export enum PayrollTransactionActionEnums {
  createPayrollTransactionPending = "CREATE_PAYROLL_TRANSACTION_PENDING",
  createPayrollTransactionSuccess = "CREATE_PAYROLL_TRANSACTION_SUCCESS",
  createPayrollTransactionError = "CREATE_PAYROLL_TRANSACTION_ERROR",

  generatePayrollTransactionPdfPending = "GENERATE_PAYROLL_TRANSACTION_PENDING",
  generatePayrollTransactionPdfSuccess = "GENERATE_PAYROLL_TRANSACTION_SUCCESS",
  generatePayrollTransactionPdfError = "GENERATE_PAYROLL_TRANSACTION_ERROR",

  downloadPayrollTransactionPdfPending = "DOWNLOAD_PAYROLL_TRANSACTION_PENDING",
  downloadPayrollTransactionPdfSuccess = "DOWNLOAD_PAYROLL_TRANSACTION_SUCCESS",
  downloadPayrollTransactionPdfError = "DOWNLOAD_PAYROLL_TRANSACTION_ERROR",

  getPayrollTransactionPending = "GET_PAYROLL_TRANSACTION_PENDING",
  getPayrollTransactionSuccess = "GET_PAYROLL_TRANSACTION_SUCCESS",
  getPayrollTransactionError = "GET_PAYROLL_TRANSACTION_ERROR",

  resetStateFlagsAction = "RESET_STATE_FLAGS",
}

export const createPayrollTransactionPending =
  createAction<IPayrollTransactionStateContext>(
    PayrollTransactionActionEnums.createPayrollTransactionPending,
    () => ({ isPending: true, isSuccess: false, isError: false })
  );

export const createPayrollTransactionSuccess = createAction<
  IPayrollTransactionStateContext,
  IPayrollTransaction
>(
  PayrollTransactionActionEnums.createPayrollTransactionSuccess,
  (payrollTransaction: IPayrollTransaction) => ({
    isPending: false,
    isSuccess: true,
    isError: false,
    payrollTransaction,
  })
);

export const createPayrollTransactionError =
  createAction<IPayrollTransactionStateContext>(
    PayrollTransactionActionEnums.createPayrollTransactionError,
    () => ({ isPending: false, isSuccess: false, isError: true })
  );

//Get payroll trasactions

export const getPayrollTransactionPending =
  createAction<IPayrollTransactionStateContext>(
    PayrollTransactionActionEnums.getPayrollTransactionPending,
    () => ({ isPending: true, isSuccess: false, isError: false })
  );

export const getPayrollTransactionSuccess = createAction<
  IPayrollTransactionStateContext,
  IPayrollTransaction[]
>(
  PayrollTransactionActionEnums.getPayrollTransactionSuccess,
  (payrollTransactions: IPayrollTransaction[]) => ({
    isPending: false,
    isSuccess: true,
    isError: false,
    payrollTransactions,
  })
);

export const getPayrollTransactionError =
  createAction<IPayrollTransactionStateContext>(
    PayrollTransactionActionEnums.getPayrollTransactionError,
    () => ({ isPending: false, isSuccess: false, isError: true })
  );
export const resetStateFlagsAction =
  createAction<IPayrollTransactionStateContext>(
    PayrollTransactionActionEnums.resetStateFlagsAction,
    () => ({ isPending: false, isSuccess: false, isError: false })
  );

//Generate Payroll Transactions  pdf
export const generatePayrollTransactionPdfPending =
  createAction<IPayrollTransactionStateContext>(
    PayrollTransactionActionEnums.generatePayrollTransactionPdfPending,
    () => ({ isPending: true, isSuccess: false, isError: false })
  );

export const generatePayrollTransactionPdfSuccess =
  createAction<IPayrollTransactionStateContext>(
    PayrollTransactionActionEnums.generatePayrollTransactionPdfSuccess,
    () => ({
      isPending: false,
      isSuccess: true,
      isError: false,
    })
  );

export const generatePayrollTransactionPdfError =
  createAction<IPayrollTransactionStateContext>(
    PayrollTransactionActionEnums.generatePayrollTransactionPdfError,
    () => ({ isPending: false, isSuccess: false, isError: true })
  );

  //download PDF

  export const downloadPayrollTransactionPdfPending =
  createAction<IPayrollTransactionStateContext>(
    PayrollTransactionActionEnums.downloadPayrollTransactionPdfPending,
    () => ({ isPending: true, isSuccess: false, isError: false })
  );

export const downloadPayrollTransactionPdfSuccess =
  createAction<IPayrollTransactionStateContext>(
    PayrollTransactionActionEnums.downloadPayrollTransactionPdfSuccess,
    () => ({
      isPending: false,
      isSuccess: true,
      isError: false,
    })
  );

export const downloadPayrollTransactionPdffError =
  createAction<IPayrollTransactionStateContext>(
    PayrollTransactionActionEnums.downloadPayrollTransactionPdfError,
    () => ({ isPending: false, isSuccess: false, isError: true })
  );