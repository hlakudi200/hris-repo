"use client";
import { getAxiosInstace } from "@/utils/axios-instance";
import { JobApplicationReducer } from "./reducer";
import { useContext, useReducer } from "react";
import {
  IJobApplication,
  INITIAL_STATE,
  JobApplicationActionContext,
  JobApplicationStateContext,
} from "./context";
import {
  getJobApplicationByIdError,
  getJobApplicationByIdPending,
  getJobApplicationByIdSuccess,
  getJobApplicationsError,
  getJobApplicationsPending,
  resetStateFlagsAction,
  submitJobApplicationError,
  submitJobApplicationPending,
  submitJobApplicationSuccess,
  UpdateJobApplicationError,
  UpdateJobApplicationPending,
  UpdateJobApplicationSuccess,
} from "./actions";
import { getJobApplicationsSuccess } from "../jobApplication/actions";

export const JobApplicationProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, dispatch] = useReducer(JobApplicationReducer, INITIAL_STATE);
  const instance = getAxiosInstace();

  const endpoint = `/api/services/app/JobApplication/Create`;

  const submitJobApplication = async (request: IJobApplication) => {
    dispatch(submitJobApplicationPending());

    instance
      .post(endpoint, request)
      .then((response) => {
        if (response.status === 200) {
          dispatch(submitJobApplicationSuccess());
        }
      })
      .catch((error) => {
        console.error(error);
        dispatch(submitJobApplicationError());
      });
  };
  const getJobApplications = async () => {
    dispatch(getJobApplicationsPending());
    const endpoint = `/api/services/app/JobApplication/GetAll`;
    await instance
      .get(endpoint)

      .then((response) => {
        dispatch(getJobApplicationsSuccess(response.data.result.items));
        console.log("JobApplications", response.data.result.items);
      })
      .catch((error) => {
        console.error(error);
        dispatch(getJobApplicationsError());
      });
  };

  const updateJobApplication = async (request: IJobApplication) => {
    dispatch(UpdateJobApplicationPending());
    const endPoint = `/api/services/app/JobApplication/Update`;
    await instance
      .put(endPoint, request)
      .then((response) => {
        dispatch(UpdateJobApplicationSuccess(response.data.resutls));
      })
      .catch((err) => {
        dispatch(UpdateJobApplicationError());
        console.log(err);
      });
  };

  const getJobApplicationById = async (id: string) => {
    dispatch(getJobApplicationByIdPending());
    const endpoint = `/api/services/app/JobApplication/Get?id=${id}`;

    try {
      const response = await instance.get(endpoint);
      if (response.status === 200) {
        dispatch(getJobApplicationByIdSuccess(response.data.result));
        return response.data.result;
      }
    } catch (error) {
      console.error("Error getting job application:", error);
      dispatch(getJobApplicationByIdError());
      throw error;
    }
  };

  const resetStateFlags = async () => {
    dispatch(resetStateFlagsAction());
  };

  return (
    <JobApplicationStateContext.Provider value={state}>
      <JobApplicationActionContext.Provider
        value={{
          submitJobApplication,
          resetStateFlags,
          getJobApplications,
          updateJobApplication,
          getJobApplicationById,
        }}
      >
        {children}
      </JobApplicationActionContext.Provider>
    </JobApplicationStateContext.Provider>
  );
};

export const useJobApplicationState = () => {
  const context = useContext(JobApplicationStateContext);
  if (!context) {
    throw new Error(
      "useJobApplicationState must be used within a JobApplicationProvider"
    );
  }
  return context;
};

export const useJobApplicationActions = () => {
  const context = useContext(JobApplicationActionContext);
  if (!context) {
    throw new Error(
      "useJobApplicationState must be used within a JobApplicationProvider"
    );
  }
  return context;
};
