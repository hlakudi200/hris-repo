'use client'
import { createContext } from "react";

export interface IAttandance {
  id?: string;
  employeeId: string;
  projectId: string;
  clockInTime: string;
  clockOutTime: string;
  yearMonthWeek :string
  note: string;
}


export interface IWeeklyHoursResponse {
  result: number;
  success: boolean;
  error: string | null;
  }
export interface IAttandanceStateContext {
  isPending: boolean;
  isSuccess: boolean;
  isError: boolean;
  weeklyHours?:IWeeklyHoursResponse
  Attandance?: IAttandance;
  Attandances?: IAttandance[];
}

export interface IAttandanceActionContext {
  getAttandances: () => void;
  getAttandance: (id: string) => void;
  getWeeklyHours:(employeeId:string)=>void;
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

  