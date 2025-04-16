import { createContext } from "react";

export interface IPayrollTransaction {
  payrollProfileId: string;
  periodStart: string;
  periodEnd: string;
  grossAmount: number;
  taxAmount?: number;
  netAmount?: number;
  isPaid: boolean;
}

export interface IPayrollTransactionStateContext {
  isPending: boolean;
  isSuccess: boolean;
  isError: boolean;
  payrollTransaction?: IPayrollTransaction;
  payrollTransactions?:IPayrollTransaction[]
}

export interface IPayrollTransactionActionContext {
  createPayrollTransaction: (transaction: IPayrollTransaction) => Promise<void>;
  getAllTrasactions:()=>void;
  resetStateFlags: () => void;
}

export const INITIAL_STATE: IPayrollTransactionStateContext = {
  isPending: false,
  isSuccess: false,
  isError: false,
};

export const PayrollTransactionStateContext =
  createContext<IPayrollTransactionStateContext>(INITIAL_STATE);
export const PayrollTransactionActionContext =
  createContext<IPayrollTransactionActionContext>(undefined);
