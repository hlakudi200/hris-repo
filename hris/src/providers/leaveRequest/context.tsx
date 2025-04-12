import { createContext } from "react";

export interface ILeaveRequest {
  employeeId: string;
  leaveType: string;
  startDate: string;
  endDate: string;
  status: string;
}

export interface ILeaveRequestStateContext {
  isPending: boolean;
  isSuccess: boolean;
  isError: boolean;
  leaveRequests?: ILeaveRequest[];
}

export interface ILeaveRequestActionContext {
  submitLeaveRequest: (request: ILeaveRequest) => Promise<void>;
}

export const INITIAL_STATE: ILeaveRequestStateContext = {
  isPending: false,
  isSuccess: false,
  isError: false,
};

export const LeaveRequestStateContext =
  createContext<ILeaveRequestStateContext>(INITIAL_STATE);
export const LeaveRequestActionContext =
  createContext<ILeaveRequestActionContext>(undefined);
