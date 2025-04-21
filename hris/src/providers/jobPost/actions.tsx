import { createAction } from "redux-actions";
import { IJobPostingStateContext } from "./context";
import { IJobPosting } from "./interfaces";

export enum JobPostingActionEnums {
  getJobPostingsPending = "GET_JOBPOSTINGS_PENDING",
  getJobPostingsSuccess = "GET_JOBPOSTINGS_SUCCESS",
  getJobPostingsError = "GET_JOBPOSTINGS_ERROR",


  getJobPostingIncludedPending = "GET_JOBPOSTINGS_INCLUDE_PENDING",
  getJobPostingIncludedSuccess = "GET_JOBPOSTINGS_INCLUDE_SUCCESS",
  getJobPostingIncludedError = "GET_JOBPOSTINGS_INCLUDE_ERROR",


  getJobPostingPending = "GET_JOBPOSTING_PENDING",
  getJobPostingSuccess = "GET_JOBPOSTING_SUCCESS",
  getJobPostingError = "GET_JOBPOSTING_ERROR",

  createJobPostingPending = "CREATE_JOBPOSTING_PENDING",
  createJobPostingSuccess = "CREATE_JOBPOSTING_SUCCESS",
  createJobPostingError = "CREATE_JOBPOSTING_ERROR",

  updateJobPostingPending = "UPDATE_JOBPOSTING_PENDING",
  updateJobPostingSuccess = "UPDATE_JOBPOSTING_SUCCESS",
  updateJobPostingError = "UPDATE_JOBPOSTING_ERROR",

  deleteJobPostingPending = "DELETE_JOBPOSTING_PENDING",
  deleteJobPostingSuccess = "DELETE_JOBPOSTING_SUCCESS",
  deleteJobPostingError = "DELETE_JOBPOSTING_ERROR",
}

export const getJobPostingsPending = createAction<IJobPostingStateContext>(
  JobPostingActionEnums.getJobPostingsPending,
  () => ({ isPending: true, isSuccess: false, isError: false })
);

export const getJobPostingsSuccess = createAction<
  IJobPostingStateContext,
  IJobPosting[]
>(
  JobPostingActionEnums.getJobPostingsSuccess,
  (JobPostings: IJobPosting[]) => ({
    isPending: false,
    isSuccess: true,
    isError: false,
    JobPostings,
  })
);

export const getJobPostingsError = createAction<IJobPostingStateContext>(
  JobPostingActionEnums.getJobPostingsError,

  () => ({ isPending: false, isSuccess: false, isError: true })
);

//get jpb posting include : 
export const getJobPostingIncludedPending = createAction<IJobPostingStateContext>(
  JobPostingActionEnums.getJobPostingIncludedPending,
  () => ({ isPending: true, isSuccess: false, isError: false })
);

export const getJobPostingIncludedSuccess = createAction<
  IJobPostingStateContext,
  IJobPosting[]
>(
  JobPostingActionEnums.getJobPostingIncludedSuccess,
  (JobPostings: IJobPosting[]) => ({
    isPending: false,
    isSuccess: true,
    isError: false,
    JobPostings,
  })
);

export const getJobPostingIncludedError = createAction<IJobPostingStateContext>(
  JobPostingActionEnums.getJobPostingIncludedError,

  () => ({ isPending: false, isSuccess: false, isError: true })
);


//Get job posting 

export const getJobPostingPending = createAction<IJobPostingStateContext>(
  JobPostingActionEnums.getJobPostingPending,
  () => ({ isPending: true, isSuccess: false, isError: false })
);

export const getJobPostingSuccess = createAction<
  IJobPostingStateContext,
  IJobPosting
>(JobPostingActionEnums.getJobPostingSuccess, (JobPosting: IJobPosting) => ({
  isPending: false,
  isSuccess: true,
  isError: false,
  JobPosting,
}));

export const getJobPostingError = createAction<IJobPostingStateContext>(
  JobPostingActionEnums.getJobPostingError,
  () => ({ isPending: false, isSuccess: false, isError: true })
);

export const createJobPostingPending = createAction<IJobPostingStateContext>(
  JobPostingActionEnums.createJobPostingPending,
  () => ({ isPending: true, isSuccess: false, isError: false })
);

export const createJobPostingSuccess = createAction<
  IJobPostingStateContext,
  IJobPosting
>(JobPostingActionEnums.createJobPostingSuccess, (JobPosting: IJobPosting) => ({
  isPending: false,
  isSuccess: true,
  isError: false,
  JobPosting,
}));

export const createJobPostingError = createAction<IJobPostingStateContext>(
  JobPostingActionEnums.createJobPostingError,
  () => ({ isPending: false, isSuccess: false, isError: true })
);

export const updateJobPostingPending = createAction<IJobPostingStateContext>(
  JobPostingActionEnums.updateJobPostingPending,
  () => ({ isPending: true, isSuccess: false, isError: false })
);

export const updateJobPostingSuccess = createAction<
  IJobPostingStateContext,
  IJobPosting
>(JobPostingActionEnums.updateJobPostingSuccess, (JobPosting: IJobPosting) => ({
  isPending: false,
  isSuccess: true,
  isError: false,
  JobPosting,
}));

export const updateJobPostingError = createAction<IJobPostingStateContext>(
  JobPostingActionEnums.updateJobPostingError,
  () => ({ isPending: false, isSuccess: false, isError: true })
);

export const deleteJobPostingPending = createAction<IJobPostingStateContext>(
  JobPostingActionEnums.deleteJobPostingPending,
  () => ({ isPending: true, isSuccess: false, isError: false })
);

export const deleteJobPostingSuccess = createAction<
  IJobPostingStateContext,
  IJobPosting
>(JobPostingActionEnums.deleteJobPostingSuccess, (JobPosting: IJobPosting) => ({
  isPending: false,
  isSuccess: true,
  isError: false,
  JobPosting,
}));

export const deleteJobPostingError = createAction<IJobPostingStateContext>(
  JobPostingActionEnums.deleteJobPostingError,
  () => ({ isPending: false, isSuccess: false, isError: true })
);
