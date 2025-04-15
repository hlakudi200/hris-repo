import { createContext } from "react";

export interface IJobApplication {
  id?:string
  jobPostingId: string;
  applicantName: string;
  email: string;
  resumePath: string;
  status: string;
  interviews?: IInterview;
}


export interface IInterview {
  jobApplicationId: string;
  scheduledDate: string;
  interviewer: string;
  mode: string;
  feedback: string;
}

export interface IJobApplicationStateContext {
  isPending: boolean;
  isSuccess: boolean;
  isError: boolean;
  jobApplications?: IJobApplication[];
}

export interface IJobApplicationActionContext {
  submitJobApplication: (application: IJobApplication) => Promise<void>;
  getJobApplications:()=>void;
  updateJobApplication:(jobApplication:IJobApplication)=>Promise<void>;
  resetStateFlags: () => void;
}

export const INITIAL_STATE: IJobApplicationStateContext = {
  isPending: false,
  isSuccess: false,
  isError: false,
};

export const JobApplicationStateContext =
  createContext<IJobApplicationStateContext>(INITIAL_STATE);
export const JobApplicationActionContext =
  createContext<IJobApplicationActionContext>(undefined);
