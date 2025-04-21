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

// Add these interfaces to context.tsx
export interface IInterviewSchedulingRequest {
  jobApplicationId: string;
  scheduledDate: Date | string;
  interviewer: string;
  mode: string;
  location?: string;
  additionalInformation?: string;
}

export interface IJobApplication {
  id: string;
  applicantName: string;
  email: string;
  status: string;
  // Add other relevant job application fields
}

export interface IInterviewActionContext {
  createInterview: (interview: ICreateInterviewRequest) => Promise<void>;
  getInterview: (id: string) => Promise<void>;
  getAllInterviews: () => Promise<void>;
  getInterviewsByJobApplication: (jobApplicationId: string) => Promise<void>;
  updateInterview: (interview: IInterview) => Promise<void>;
  deleteInterview: (id: string) => Promise<void>;

  // New methods based on InterviewAppService
  scheduleInterview: (interview: IInterviewSchedulingRequest) => Promise<void>;
  getApplicantDetails: (jobApplicationId: string) => Promise<IJobApplication>;
  getPendingApplications: () => Promise<IJobApplication[]>;
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
