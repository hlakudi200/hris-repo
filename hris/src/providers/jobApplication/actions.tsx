import { IJobApplication, IJobApplicationStateContext } from "./context";
import { createAction } from "redux-actions";

export enum JobApplicationActionEnums {
  submitJobApplicationPending = "SUBMIT_JOB_APPLICATION_PENDING",
  submitJobApplicationSuccess = "SUBMIT_JOB_APPLICATION_SUCCESS",
  submitJobApplicationError = "SUBMIT_JOB_APPLICATION_ERROR",

  uploadResumePending = "UPLOAD_RESUME_PENDING",
  uploadResumeSuccess = "UPLOAD_RESUME_SUCCESS",
  uploadResumeError = "UPLOAD_RESUME_ERROR",

  getJobApplicationsPending = "GET_JOB_APPLICATIONS_PENDING",
  getJobApplicationsSuccess = "GET_JOB_APPLICATIONS_SUCCESS",
  getJobApplicationsError = "GET_JOB_APPLICATIONS_ERROR",

  UpdateJobApplicationPending = "UPDATE_JOB_APPLICATION_PENDING",
  UpdateJobApplicationSuccess = "UPDATE_JOB_APPLICATION_SUCCESS",
  UpdateJobApplicationError = "UPDATE_JOB_APPLICATION_ERROR",

  getJobApplicationByIdPending = "GET_JOB_APPLICATION_BY_ID_PENDING",
  getJobApplicationByIdSuccess = "GET_JOB_APPLICATION_BY_ID_SUCCESS",
  getJobApplicationByIdError = "GET_JOB_APPLICATION_BY_ID_ERROR",

  resetStateFlagsAction = "RESET_STATE_FLAGS",
}

//new action for getting job application by id
export const getJobApplicationByIdPending =
  createAction<IJobApplicationStateContext>(
    JobApplicationActionEnums.getJobApplicationByIdPending,
    () => ({ isPending: true, isSuccess: false, isError: false })
  );

export const getJobApplicationByIdSuccess = createAction<
  IJobApplicationStateContext,
  IJobApplication
>(
  JobApplicationActionEnums.getJobApplicationByIdSuccess,
  (application: IJobApplication) => ({
    isPending: false,
    isSuccess: true,
    isError: false,
    application,
  })
);
export const getJobApplicationByIdError =
  createAction<IJobApplicationStateContext>(
    JobApplicationActionEnums.getJobApplicationByIdError,
    () => ({ isPending: false, isSuccess: false, isError: true })
  );
//upload resume action
export const uploadResumePending = createAction<IJobApplicationStateContext>(
  JobApplicationActionEnums.uploadResumePending,
  () => ({ isPending: true, isSuccess: false, isError: false })
);

export const uploadResumeSuccess = createAction<IJobApplicationStateContext>(
  JobApplicationActionEnums.uploadResumeSuccess,
  () => ({
    isPending: false,
    isSuccess: true,
    isError: false,
  })
);
export const uploadResumeError = createAction<IJobApplicationStateContext>(
  JobApplicationActionEnums.uploadResumeError,
  () => ({ isPending: false, isSuccess: false, isError: true })
);

//Submit Job Application
export const submitJobApplicationPending =
  createAction<IJobApplicationStateContext>(
    JobApplicationActionEnums.submitJobApplicationPending,
    () => ({ isPending: true, isSuccess: false, isError: false })
  );
export const submitJobApplicationSuccess = createAction<
  IJobApplicationStateContext,
  IJobApplication
>(
  JobApplicationActionEnums.submitJobApplicationSuccess,
  (application: IJobApplication) => ({
    isPending: false,
    isSuccess: true,
    isError: false,
    application,
  })
);
export const submitJobApplicationError =
  createAction<IJobApplicationStateContext>(
    JobApplicationActionEnums.submitJobApplicationError,
    () => ({ isPending: false, isSuccess: false, isError: true })
  );

//update job Application
export const UpdateJobApplicationPending =
  createAction<IJobApplicationStateContext>(
    JobApplicationActionEnums.UpdateJobApplicationPending,
    () => ({ isPending: true, isSuccess: false, isError: false })
  );
export const UpdateJobApplicationSuccess = createAction<
  IJobApplicationStateContext,
  IJobApplication
>(
  JobApplicationActionEnums.UpdateJobApplicationSuccess,
  (jobApplication: IJobApplication) => ({
    isPending: false,
    isSuccess: true,
    isError: false,
    jobApplication,
  })
);
export const UpdateJobApplicationError =
  createAction<IJobApplicationStateContext>(
    JobApplicationActionEnums.UpdateJobApplicationError,
    () => ({ isPending: false, isSuccess: false, isError: true })
  );

//get Job Application :
export const getJobApplicationsPending =
  createAction<IJobApplicationStateContext>(
    JobApplicationActionEnums.getJobApplicationsPending,
    () => ({ isPending: true, isSuccess: false, isError: false })
  );

export const getJobApplicationsSuccess = createAction<
  IJobApplicationStateContext,
  IJobApplication[]
>(
  JobApplicationActionEnums.getJobApplicationsSuccess,
  (jobApplications: IJobApplication[]) => ({
    isPending: false,
    isSuccess: true,
    isError: false,
    jobApplications,
  })
);

export const getJobApplicationsError =
  createAction<IJobApplicationStateContext>(
    JobApplicationActionEnums.getJobApplicationsError,
    () => ({ isPending: false, isSuccess: false, isError: true })
  );

export const resetStateFlagsAction = createAction<IJobApplicationStateContext>(
  JobApplicationActionEnums.resetStateFlagsAction,
  () => ({ isPending: false, isSuccess: false, isError: false })
);
