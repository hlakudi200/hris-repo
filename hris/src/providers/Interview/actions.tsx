import { createAction } from "redux-actions";
import { IInterview, IInterviewStateContext, IJobApplication } from "./context";

export enum InterviewActionEnums {
  createInterviewPending = "CREATE_INTERVIEW_PENDING",
  createInterviewSuccess = "CREATE_INTERVIEW_SUCCESS",
  createInterviewError = "CREATE_INTERVIEW_ERROR",

  getInterviewPending = "GET_INTERVIEW_PENDING",
  getInterviewSuccess = "GET_INTERVIEW_SUCCESS",
  getInterviewError = "GET_INTERVIEW_ERROR",

  getAllInterviewsPending = "GET_ALL_INTERVIEWS_PENDING",
  getAllInterviewsSuccess = "GET_ALL_INTERVIEWS_SUCCESS",
  getAllInterviewsError = "GET_ALL_INTERVIEWS_ERROR",

  getInterviewsByJobApplicationPending = "GET_INTERVIEWS_BY_JOB_APPLICATION_PENDING",
  getInterviewsByJobApplicationSuccess = "GET_INTERVIEWS_BY_JOB_APPLICATION_SUCCESS",
  getInterviewsByJobApplicationError = "GET_INTERVIEWS_BY_JOB_APPLICATION_ERROR",

  updateInterviewPending = "UPDATE_INTERVIEW_PENDING",
  updateInterviewSuccess = "UPDATE_INTERVIEW_SUCCESS",
  updateInterviewError = "UPDATE_INTERVIEW_ERROR",

  deleteInterviewPending = "DELETE_INTERVIEW_PENDING",
  deleteInterviewSuccess = "DELETE_INTERVIEW_SUCCESS",
  deleteInterviewError = "DELETE_INTERVIEW_ERROR",

  // New action types
  scheduleInterviewPending = "SCHEDULE_INTERVIEW_PENDING",
  scheduleInterviewSuccess = "SCHEDULE_INTERVIEW_SUCCESS",
  scheduleInterviewError = "SCHEDULE_INTERVIEW_ERROR",

  getApplicantDetailsPending = "GET_APPLICANT_DETAILS_PENDING",
  getApplicantDetailsSuccess = "GET_APPLICANT_DETAILS_SUCCESS",
  getApplicantDetailsError = "GET_APPLICANT_DETAILS_ERROR",

  getPendingApplicationsPending = "GET_PENDING_APPLICATIONS_PENDING",
  getPendingApplicationsSuccess = "GET_PENDING_APPLICATIONS_SUCCESS",
  getPendingApplicationsError = "GET_PENDING_APPLICATIONS_ERROR",
}

// Create interview actions
export const createInterviewPending = createAction<IInterviewStateContext>(
  InterviewActionEnums.createInterviewPending,
  () => ({ isPending: true, isSuccess: false, isError: false })
);

export const createInterviewSuccess = createAction<
  IInterviewStateContext,
  IInterview
>(
  InterviewActionEnums.createInterviewSuccess,
  (currentInterview: IInterview) => ({
    isPending: false,
    isSuccess: true,
    isError: false,
    currentInterview,
  })
);

export const createInterviewError = createAction<
  IInterviewStateContext,
  string
>(InterviewActionEnums.createInterviewError, (errorMessage: string) => ({
  isPending: false,
  isSuccess: false,
  isError: true,
  errorMessage,
}));

// Get interview actions
export const getInterviewPending = createAction<IInterviewStateContext>(
  InterviewActionEnums.getInterviewPending,
  () => ({ isPending: true, isSuccess: false, isError: false })
);

export const getInterviewSuccess = createAction<
  IInterviewStateContext,
  IInterview
>(InterviewActionEnums.getInterviewSuccess, (currentInterview: IInterview) => ({
  isPending: false,
  isSuccess: true,
  isError: false,
  currentInterview,
}));

export const getInterviewError = createAction<IInterviewStateContext, string>(
  InterviewActionEnums.getInterviewError,
  (errorMessage: string) => ({
    isPending: false,
    isSuccess: false,
    isError: true,
    errorMessage,
  })
);

// Get all interviews actions
export const getAllInterviewsPending = createAction<IInterviewStateContext>(
  InterviewActionEnums.getAllInterviewsPending,
  () => ({ isPending: true, isSuccess: false, isError: false })
);

export const getAllInterviewsSuccess = createAction<
  IInterviewStateContext,
  IInterview[]
>(InterviewActionEnums.getAllInterviewsSuccess, (interviews: IInterview[]) => ({
  isPending: false,
  isSuccess: true,
  isError: false,
  interviews,
}));

export const getAllInterviewsError = createAction<
  IInterviewStateContext,
  string
>(InterviewActionEnums.getAllInterviewsError, (errorMessage: string) => ({
  isPending: false,
  isSuccess: false,
  isError: true,
  errorMessage,
}));

// Get interviews by job application actions
export const getInterviewsByJobApplicationPending =
  createAction<IInterviewStateContext>(
    InterviewActionEnums.getInterviewsByJobApplicationPending,
    () => ({ isPending: true, isSuccess: false, isError: false })
  );

export const getInterviewsByJobApplicationSuccess = createAction<
  IInterviewStateContext,
  IInterview[]
>(
  InterviewActionEnums.getInterviewsByJobApplicationSuccess,
  (interviews: IInterview[]) => ({
    isPending: false,
    isSuccess: true,
    isError: false,
    interviews,
  })
);

export const getInterviewsByJobApplicationError = createAction<
  IInterviewStateContext,
  string
>(
  InterviewActionEnums.getInterviewsByJobApplicationError,
  (errorMessage: string) => ({
    isPending: false,
    isSuccess: false,
    isError: true,
    errorMessage,
  })
);

// Update interview actions
export const updateInterviewPending = createAction<IInterviewStateContext>(
  InterviewActionEnums.updateInterviewPending,
  () => ({ isPending: true, isSuccess: false, isError: false })
);

export const updateInterviewSuccess = createAction<
  IInterviewStateContext,
  IInterview
>(
  InterviewActionEnums.updateInterviewSuccess,
  (currentInterview: IInterview) => ({
    isPending: false,
    isSuccess: true,
    isError: false,
    currentInterview,
  })
);

export const updateInterviewError = createAction<
  IInterviewStateContext,
  string
>(InterviewActionEnums.updateInterviewError, (errorMessage: string) => ({
  isPending: false,
  isSuccess: false,
  isError: true,
  errorMessage,
}));

// Delete interview actions
export const deleteInterviewPending = createAction<IInterviewStateContext>(
  InterviewActionEnums.deleteInterviewPending,
  () => ({ isPending: true, isSuccess: false, isError: false })
);

export const deleteInterviewSuccess = createAction<IInterviewStateContext>(
  InterviewActionEnums.deleteInterviewSuccess,
  () => ({
    isPending: false,
    isSuccess: true,
    isError: false,
  })
);

export const deleteInterviewError = createAction<
  IInterviewStateContext,
  string
>(InterviewActionEnums.deleteInterviewError, (errorMessage: string) => ({
  isPending: false,
  isSuccess: false,
  isError: true,
  errorMessage,
}));

// Schedule interview actions
export const scheduleInterviewPending = createAction<IInterviewStateContext>(
  InterviewActionEnums.scheduleInterviewPending,
  () => ({ isPending: true, isSuccess: false, isError: false })
);

export const scheduleInterviewSuccess = createAction<
  IInterviewStateContext,
  IInterview
>(
  InterviewActionEnums.scheduleInterviewSuccess,
  (currentInterview: IInterview) => ({
    isPending: false,
    isSuccess: true,
    isError: false,
    currentInterview,
  })
);

export const scheduleInterviewError = createAction<
  IInterviewStateContext,
  string
>(InterviewActionEnums.scheduleInterviewError, (errorMessage: string) => ({
  isPending: false,
  isSuccess: false,
  isError: true,
  errorMessage,
}));

// Get applicant details actions
export const getApplicantDetailsPending = createAction<IInterviewStateContext>(
  InterviewActionEnums.getApplicantDetailsPending,
  () => ({ isPending: true, isSuccess: false, isError: false })
);

export const getApplicantDetailsSuccess = createAction<
  IInterviewStateContext,
  IJobApplication
>(
  InterviewActionEnums.getApplicantDetailsSuccess,
  (applicant: IJobApplication) => ({
    isPending: false,
    isSuccess: true,
    isError: false,
    applicant,
  })
);

export const getApplicantDetailsError = createAction<
  IInterviewStateContext,
  string
>(InterviewActionEnums.getApplicantDetailsError, (errorMessage: string) => ({
  isPending: false,
  isSuccess: false,
  isError: true,
  errorMessage,
}));

// Get pending applications actions
export const getPendingApplicationsPending =
  createAction<IInterviewStateContext>(
    InterviewActionEnums.getPendingApplicationsPending,
    () => ({ isPending: true, isSuccess: false, isError: false })
  );

export const getPendingApplicationsSuccess = createAction<
  IInterviewStateContext,
  IJobApplication[]
>(
  InterviewActionEnums.getPendingApplicationsSuccess,
  (pendingApplications: IJobApplication[]) => ({
    isPending: false,
    isSuccess: true,
    isError: false,
    pendingApplications,
  })
);

export const getPendingApplicationsError = createAction<
  IInterviewStateContext,
  string
>(InterviewActionEnums.getPendingApplicationsError, (errorMessage: string) => ({
  isPending: false,
  isSuccess: false,
  isError: true,
  errorMessage,
}));
