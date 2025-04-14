"use client";

import { createContext } from "react";

export interface IInterview {
  id: string;
  jobApplicationId: string;
  scheduledDate: Date | string;
  interviewer: string;
  mode: string;
  feedback: string;
}

export interface ICreateInterviewRequest {
  jobApplicationId: string;
  scheduledDate: Date | string;
  interviewer: string;
  mode: string;
  feedback?: string;
}

export interface IInterviewStateContext {
  isPending: boolean;
  isSuccess: boolean;
  isError: boolean;
  currentInterview?: IInterview;
  interviews?: IInterview[];
  errorMessage?: string;
}

export interface IInterviewActionContext {
  createInterview: (interview: ICreateInterviewRequest) => Promise<void>;
  getInterview: (id: string) => Promise<void>;
  getInterviewsByJobApplication: (jobApplicationId: string) => Promise<void>;
  updateInterview: (interview: IInterview) => Promise<void>;
  deleteInterview: (id: string) => Promise<void>;
}

export const INITIAL_STATE: IInterviewStateContext = {
  isPending: false,
  isSuccess: false,
  isError: false,
};

export const InterviewStateContext =
  createContext<IInterviewStateContext>(INITIAL_STATE);
export const InterviewActionContext =
  createContext<IInterviewActionContext>(undefined);
