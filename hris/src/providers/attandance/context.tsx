import { createContext } from "react";

export interface IAttandance {
  id: string;
  employeeId: string;
  price: number;
  projectId: string;
  clockInTime: string;
  clockOutTime: string;
  note: string;
}

export interface IAttandanceStateContext {
  isPending: boolean;
  isSuccess: boolean;
  isError: boolean;
  Attandance?: IAttandance;
  Attandances?: IAttandance[];
}

export interface IAttandanceActionContext {
  getAttandances: () => void;
  getAttandance: (id: string) => void;
  createAttandance: (Attandance: IAttandance) => void;
  updateAttandance: (Attandance: IAttandance) => void;
  deleteAttandance: (id: string) => void;
}

export const INITIAL_STATE: IAttandanceStateContext = {
  isPending: false,
  isSuccess: false,
  isError: false,
};

export const AttandanceStateContext =
  createContext<IAttandanceStateContext>(INITIAL_STATE);

export const AttandanceActionContext =
  createContext<IAttandanceActionContext>(undefined);

  