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
  resetStateFlagsAction,
  submitJobApplicationError,
  submitJobApplicationPending,
  submitJobApplicationSuccess,
} from "./actions";

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

  const resetStateFlags = async () => {
    dispatch(resetStateFlagsAction());
  };

  return (
    <JobApplicationStateContext.Provider value={state}>
      <JobApplicationActionContext.Provider
        value={{ submitJobApplication, resetStateFlags }}
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
