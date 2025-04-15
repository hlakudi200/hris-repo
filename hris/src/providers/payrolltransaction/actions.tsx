import {
  IPayrollTransaction,
  IPayrollTransactionStateContext,
} from "@/providers/payrolltransaction/context";

import { createAction } from "redux-actions";

export enum PayrollTransactionActionEnums {
  createPayrollTransactionPending = "CREATE_PAYROLL_TRANSACTION_PENDING",
  createPayrollTransactionSuccess = "CREATE_PAYROLL_TRANSACTION_SUCCESS",
  createPayrollTransactionError = "CREATE_PAYROLL_TRANSACTION_ERROR",

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
