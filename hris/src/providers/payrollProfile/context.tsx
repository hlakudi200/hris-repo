import { createContext } from "react";
import { IPayrollTransaction } from "../payrolltransaction/context";

export interface INamedPayrollProfile {
  id: string;
  employeeId: string;
  employeeName: string;
  employeePosition: string;
  basicSalary: number;
  taxRate: number;
  transactions: IPayrollTransaction[];
}
export interface IPayrollStateContext {
  isPending: boolean;
  isSuccess: boolean;
  isError: boolean;
  namedPayrollProfiles?: INamedPayrollProfile[];
}

export interface IPayrollActionContext {
  getAllNamed: () => void;
  resetStateFlags: () => void;
}

export const INITIAL_STATE: IPayrollStateContext = {
  isPending: false,
  isSuccess: false,
  isError: false,
};
export const PayrollStateContext =
  createContext<IPayrollStateContext>(INITIAL_STATE);
export const PayrollActionContext =
  createContext<IPayrollActionContext>(undefined);
