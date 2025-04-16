import { IJobApplication, IJobApplicationStateContext } from "./context";
import { createAction } from "redux-actions";

export enum JobApplicationActionEnums {
  submitJobApplicationPending = "SUBMIT_LEAVE_REQUEST_USER_PENDING",
  submitJobApplicationSuccess = "SUBMIT_LEAVE_REQUEST_SUCCESS",
  submitJobApplicationError = "SUBMIT_LEAVE_REQUEST_ERROR",

  getJobApplicationsPending = "GET_JOB_APPLICATIONS_PENDING",
  getJobApplicationsSuccess = "GET_JOB_APPLICATIONS_SUCCESS",
  getJobApplicationsError = "GET_JOB_APPLICATIONS_ERROR",

  UpdateJobApplicationPending = "UPDATE_JOB_APPLICATION_PENDING",
  UpdateJobApplicationSuccess = "UPDATE_JOB_APPLICATION_SUCCESS",
  UpdateJobApplicationError = "UPDATEJOB_APPLICATION_ERROR",


  resetStateFlagsAction = "RESET_STATE_FLAGS",
}

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
export const UpdateJobApplicationPending = createAction<IJobApplicationStateContext>(
  JobApplicationActionEnums.UpdateJobApplicationPending,
  () => ({ isPending: true, isSuccess: false, isError: false })
);
export const UpdateJobApplicationSuccess = createAction<
IJobApplicationStateContext,
  IJobApplication
>(JobApplicationActionEnums.UpdateJobApplicationSuccess, (jobApplication:IJobApplication) => ({
  isPending: false,
  isSuccess: true,
  isError: false,
  jobApplication,
}));
export const UpdateJobApplicationError = createAction<IJobApplicationStateContext>(
  JobApplicationActionEnums.UpdateJobApplicationError,
  () => ({ isPending: false, isSuccess: false, isError: true })
);

//get Job Application :

export const getJobApplicationsPending = createAction<IJobApplicationStateContext>(
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

export const getJobApplicationsError = createAction<IJobApplicationStateContext>(
  JobApplicationActionEnums.getJobApplicationsError,
  () => ({ isPending: false, isSuccess: false, isError: true })
);

export const resetStateFlagsAction = createAction<IJobApplicationStateContext>(
  JobApplicationActionEnums.resetStateFlagsAction,
  () => ({ isPending: false, isSuccess: false, isError: false })
);
