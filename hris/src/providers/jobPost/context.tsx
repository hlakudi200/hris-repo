"use client";
import { createContext } from "react";
import { IJobPosting } from "./interfaces";

export interface IJobPostingStateContext {
  isPending: boolean;
  isSuccess: boolean;
  isError: boolean;
  IJobPosting?: IJobPosting;
  JobPostings?: IJobPosting[];
}

export interface IJobPostingActionContext {
  getJobPostings: () => void;
  getJobPosting: (id: string) => void;
  getJobPostingIncluded:()=>Promise<void>;
  createJobPosting: (JobPosting: IJobPosting) => void;
  updateJobPosting: (JobPosting: IJobPosting) => void;
  deleteJobPosting: (id: string) => void;
}

export const INITIAL_STATE: IJobPostingStateContext = {
  isPending: false,
  isSuccess: false,
  isError: false,
};

export const JobPostingStateContext =
  createContext<IJobPostingStateContext>(INITIAL_STATE);

export const JobPostingActionContext =
  createContext<IJobPostingActionContext>(undefined);
