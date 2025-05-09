import { createAction } from "redux-actions";
import { IJobApplicant, ApplicantStateContext } from "./context";
import { IJobApplication } from "../jobPost/interfaces";

export enum ApplicantActionEnums {
  getApplicantByIdPending = "GET_APPLICANT_BY_ID_PENDING",
  getApplicantByIdSuccess = "GET_APPLICANT_BY_ID_SUCCESS",
  getApplicantByIdError = "GET_APPLICANT_BY_ID_ERROR",

  getApplicantJobApplicationsPending = "GET_APPLICANT_JOB_APPLICATIONS_PENDING",
  getApplicantJobApplicationsSuccess = "GET_APPLICANT_JOB_APPLICATIONS_SUCCESS",
  getApplicantJobApplicationsError = "GET_APPLICANT_JOB_APPLICATIONS_ERROR",

  createApplicantPending = "CREATE_APPLICANT_PENDING",
  createApplicantSuccess = "CREATE_APPLICANT_SUCCESS",
  createApplicantError = "CREATE_APPLICANT_ERROR",

  updateApplicantPending = "UPDATE_APPLICANT_PENDING",
  updateApplicantSuccess = "UPDATE_APPLICANT__SUCCESS",
  updateApplicantError = "UPDATE_APPLICANT_ERROR",
}

//Get Applicant by Id
export const getApplicantByIdPending = createAction<ApplicantStateContext>(
  ApplicantActionEnums.getApplicantByIdPending,
  () => ({ isPending: true, isSuccess: false, isError: false })
);

export const getApplicantByIdSuccess = createAction<
  ApplicantStateContext,
  IJobApplicant
>(ApplicantActionEnums.getApplicantByIdSuccess, (applicant: IJobApplicant) => ({
  isPending: false,
  isSuccess: true,
  isError: false,
  applicant,
}));
export const getApplicantByIdError = createAction<ApplicantStateContext>(
  ApplicantActionEnums.getApplicantByIdError,
  () => ({ isPending: false, isSuccess: false, isError: true })
);

//Get Applicant Job Applications
export const getApplicantJobApplicationsPending =
  createAction<ApplicantStateContext>(
    ApplicantActionEnums.getApplicantJobApplicationsPending,
    () => ({ isPending: true, isSuccess: false, isError: false })
  );

  export const getApplicantJobApplicationsSuccess = createAction<
  { JobApplications: IJobApplication[] }
>(
  ApplicantActionEnums.getApplicantJobApplicationsSuccess,
  (jobApplications) => ({
    isPending: false,
    isSuccess: true,
    isError: false,
    JobApplications: jobApplications,
  })
);
export const getApplicantJobApplicationsError =
  createAction<ApplicantStateContext>(
    ApplicantActionEnums.getApplicantJobApplicationsError,
    () => ({ isPending: false, isSuccess: false, isError: true })
  );

//create applicant

export const createApplicantPending = createAction<ApplicantStateContext>(
  ApplicantActionEnums.createApplicantPending,
  () => ({ isPending: true, isSuccess: false, isError: false })
);

export const createApplicantSuccess = createAction<
  ApplicantStateContext,
  IJobApplicant
>(ApplicantActionEnums.createApplicantSuccess, (applicant: IJobApplicant) => ({
  isPending: false,
  isSuccess: true,
  isError: false,
  applicant,
}));

export const createApplicantError = createAction<ApplicantStateContext>(
  ApplicantActionEnums.createApplicantError,
  () => ({ isPending: false, isSuccess: false, isError: true })
);

//Update Applicant
export const updateApplicantPending = createAction<ApplicantStateContext>(
  ApplicantActionEnums.updateApplicantPending,
  () => ({ isPending: true, isSuccess: false, isError: false })
);

export const updateApplicantSuccess = createAction<
  ApplicantStateContext,
  IJobApplicant
>(ApplicantActionEnums.updateApplicantSuccess, (applicant: IJobApplicant) => ({
  isPending: false,
  isSuccess: true,
  isError: false,
  applicant,
}));

export const updateApplicantError = createAction<ApplicantStateContext>(
  ApplicantActionEnums.updateApplicantError,
  () => ({ isPending: false, isSuccess: false, isError: true })
);
