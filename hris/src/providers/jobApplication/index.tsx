"use client";
import { getAxiosInstace } from "@/utils/axios-instance";
import { JobApplicationReducer } from "./reducer";
import { useContext, useReducer } from "react";
import { v4 as uuidv4 } from "uuid";
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
  uploadResumeError,
  uploadResumePending,
  uploadResumeSuccess,
} from "./actions";
import { getJobApplicationsSuccess } from "../jobApplication/actions";
import { supabase } from "@/utils/supabaseClient";

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
        console.error(err);
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

  const uploadResume = async (file: File): Promise<string> => {
    dispatch(uploadResumePending());

    const uniqueId = uuidv4();
    const filePath = `resume/${uniqueId}_${file.name}`;

    const { error } = await supabase.storage
      .from("storage")
      .upload(filePath, file, {
        cacheControl: "3600",
        upsert: true,
      });

    if (error) {
      dispatch(uploadResumeError());
      console.error("Resume upload error:", error);
      throw error;
    }

    dispatch(uploadResumeSuccess());

    const {
      data: { publicUrl },
    } = supabase.storage.from("storage").getPublicUrl(filePath);

    return publicUrl;
  };

  const resetStateFlags = async () => {
    dispatch(resetStateFlagsAction());
  };

  return (
    <JobApplicationStateContext.Provider value={state}>
      <JobApplicationActionContext.Provider
        value={{
          uploadResume,
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
