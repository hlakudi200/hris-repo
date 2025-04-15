import { createAction } from "redux-actions";
import { IAttandance, IAttandanceStateContext, IProject } from "./context";

export enum AttandanceActionEnums {
  getAttandancesPending = "GET_ATTANDANCES_PENDING",
  getAttandancesSuccess = "GET_ATTANDANCES_SUCCESS",
  getAttandancesError = "GET_ATTANDANCES_ERROR",

  getProjectsPending = "GET_PROJECTS_PENDING",
  getProjectsSuccess = "GET_PROJECTS_SUCCESS",
  getProjectsError = "GET_PROJECTS_ERROR",

  getWeeklyHoursPending = "GET_WEEKLYHOURS_PENDING",
  getWeeklyHoursSuccess = "GET_WEEKLYHOURS_SUCCESS",
  getWeeklyHoursError = "GET_WEEKLYHOURS_ERROR",

  getAttandancePending = "GET_ATTANDANCE_PENDING",
  getAttandanceSuccess = "GET_ATTANDANCE_SUCCESS",
  getAttandanceError = "GET_ATTANDANCE_ERROR",

  createAttandancePending = "CREATE_ATTANDANCE_PENDING",
  createAttandanceSuccess = "CREATE_ATTANDANCE_SUCCESS",
  createAttandanceError = "CREATE_ATTANDANCE_ERROR",

  createProjectPending = "CREATE_PROJECT_PENDING",
  createProjectSuccess = "CREATE_PROJECT_SUCCESS",
  createProjectError = "CREATE_PROJECT_ERROR",

  updateAttandancePending = "UPDATE_ATTANDANCE_PENDING",
  updateAttandanceSuccess = "UPDATE_ATTANDANCE_SUCCESS",
  updateAttandanceError = "UPDATE_ATTANDANCE_ERROR",

  deleteAttandancePending = "DELETE_ATTANDANCE_PENDING",
  deleteAttandanceSuccess = "DELETE_ATTANDANCE_SUCCESS",
  deleteAttandanceError = "DELETE_ATTANDANCE_ERROR",
}

export const getAttandancesPending = createAction<IAttandanceStateContext>(
  AttandanceActionEnums.getAttandancesPending,
  () => ({ isPending: true, isSuccess: false, isError: false })
);

export const getAttandancesSuccess = createAction<
  IAttandanceStateContext,
  IAttandance[]
>(
  AttandanceActionEnums.getAttandancesSuccess,
  (Attandances: IAttandance[]) => ({
    isPending: false,
    isSuccess: true,
    isError: false,
    Attandances,
  })
);
export const getAttandancesError = createAction<IAttandanceStateContext>(
  AttandanceActionEnums.getAttandancesError,
  () => ({ isPending: false, isSuccess: false, isError: true })
);

export const getWeeklyHoursPending = createAction<IAttandanceStateContext>(
  AttandanceActionEnums.getAttandancePending,
  () => ({ isPending: true, isSuccess: false, isError: false })
);
export const getWeeklyHoursSuccess = createAction<
  IAttandanceStateContext,
  number
>(AttandanceActionEnums.getWeeklyHoursSuccess, (result: number) => ({
  isPending: false,
  isSuccess: true,
  isError: false,
  weeklyHours: { result },
}));
export const getWeeklyHoursError = createAction<IAttandanceStateContext>(
  AttandanceActionEnums.getWeeklyHoursError,
  () => ({ isPending: false, isSuccess: false, isError: true })
);

export const getAttandancePending = createAction<IAttandanceStateContext>(
  AttandanceActionEnums.getAttandancePending,
  () => ({ isPending: true, isSuccess: false, isError: false })
);
export const getAttandanceSuccess = createAction<
  IAttandanceStateContext,
  IAttandance
>(AttandanceActionEnums.getAttandanceSuccess, (Attandance: IAttandance) => ({
  isPending: false,
  isSuccess: true,
  isError: false,
  Attandance,
}));

export const getAttandanceError = createAction<IAttandanceStateContext>(
  AttandanceActionEnums.getAttandanceError,
  () => ({ isPending: false, isSuccess: false, isError: true })
);

//get Projects
export const getProjectsPending = createAction<IAttandanceStateContext>(
  AttandanceActionEnums.getProjectsPending,
  () => ({ isPending: true, isSuccess: false, isError: false })
);

export const getProjectsSuccess = createAction<
  IAttandanceStateContext,
  IProject[]
>(AttandanceActionEnums.getProjectsSuccess, (projects: IProject[]) => ({
  isPending: false,
  isSuccess: true,
  isError: false,
  projects,
}));

export const getProjectsError = createAction<IAttandanceStateContext>(
  AttandanceActionEnums.getProjectsPending,
  () => ({ isPending: false, isSuccess: false, isError: true })
);

//create Attandance 
export const createAttandancePending = createAction<IAttandanceStateContext>(
  AttandanceActionEnums.createAttandancePending,
  () => ({ isPending: true, isSuccess: false, isError: false })
);

export const createAttandanceSuccess = createAction<
  IAttandanceStateContext,
  IAttandance
>(AttandanceActionEnums.createAttandanceSuccess, (Attandance: IAttandance) => ({
  isPending: false,
  isSuccess: true,
  isError: false,
  Attandance,
}));

export const createAttandanceError = createAction<IAttandanceStateContext>(
  AttandanceActionEnums.createAttandanceError,
  () => ({ isPending: false, isSuccess: false, isError: true })
);

//create Project
export const createProjectPending = createAction<IAttandanceStateContext>(
  AttandanceActionEnums.createProjectPending,
  () => ({ isPending: true, isSuccess: false, isError: false })
);

export const createProjectSuccess = createAction<
  IAttandanceStateContext,
  IProject
>(AttandanceActionEnums.createProjectSuccess, (project: IProject) => ({
  isPending: false,
  isSuccess: true,
  isError: false,
  project,
}));

export const createProjecError = createAction<IAttandanceStateContext>(
  AttandanceActionEnums.createProjectError,
  () => ({ isPending: false, isSuccess: false, isError: true })
);

//update Attandance
export const updateAttandancePending = createAction<IAttandanceStateContext>(
  AttandanceActionEnums.updateAttandancePending,
  () => ({ isPending: true, isSuccess: false, isError: false })
);
export const updateAttandanceSuccess = createAction<
  IAttandanceStateContext,
  IAttandance
>(AttandanceActionEnums.updateAttandanceSuccess, (Attandance: IAttandance) => ({
  isPending: false,
  isSuccess: true,
  isError: false,
  Attandance,
}));
export const updateAttandanceError = createAction<IAttandanceStateContext>(
  AttandanceActionEnums.updateAttandanceError,
  () => ({ isPending: false, isSuccess: false, isError: true })
);

export const deleteAttandancePending = createAction<IAttandanceStateContext>(
  AttandanceActionEnums.deleteAttandancePending,
  () => ({ isPending: true, isSuccess: false, isError: false })
);
export const deleteAttandanceSuccess = createAction<
  IAttandanceStateContext,
  IAttandance
>(AttandanceActionEnums.deleteAttandanceSuccess, (Attandance: IAttandance) => ({
  isPending: false,
  isSuccess: true,
  isError: false,
  Attandance,
}));
export const deleteAttandanceError = createAction<IAttandanceStateContext>(
  AttandanceActionEnums.deleteAttandanceError,
  () => ({ isPending: false, isSuccess: false, isError: true })
);
