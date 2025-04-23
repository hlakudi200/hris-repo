import { createContext } from "react";

export interface ILeaves {
  id?: string;
  employeeId?: string;
  annual: number;
  sick: number;
  study: number;
  familyResponsibility: number;
}

export interface ILeavesStateContext {
  isPending: boolean;
  isSuccess: boolean;
  isError: boolean;
  leaves?: ILeaves;
  leavesList?: ILeaves[];
}
export interface ILeavesActionContext {
  getLeaves: (employeeId: string) => Promise<void>;
  getAllLeaves: () => Promise<void>;
  updateLeaves: (leaves: ILeaves) => Promise<void>;
  resetStateFlags: () => void;
}
export const INITIAL_STATE: ILeavesStateContext = {
  isPending: false,
  isSuccess: false,
  isError: false,
};
export const LeaveStateContext =
  createContext<ILeavesStateContext>(INITIAL_STATE);
export const LeaveActionContext =
  createContext<ILeavesActionContext>(undefined);
