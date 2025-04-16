"use client";

import { useContext, useReducer } from "react";
import { InterviewReducer } from "./reducer";
import {
  InterviewActionContext,
  InterviewStateContext,
  ICreateInterviewRequest,
  IInterview,
  INITIAL_STATE,
} from "./context";
import {
  createInterviewError,
  createInterviewPending,
  createInterviewSuccess,
  getInterviewError,
  getInterviewPending,
  getInterviewSuccess,
  getInterviewsByJobApplicationError,
  getInterviewsByJobApplicationPending,
  getInterviewsByJobApplicationSuccess,
  updateInterviewError,
  updateInterviewPending,
  updateInterviewSuccess,
  deleteInterviewError,
  deleteInterviewPending,
  deleteInterviewSuccess,
} from "./actions";
import { getAxiosInstace } from "@/utils/axios-instance";

export const InterviewProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, dispatch] = useReducer(InterviewReducer, INITIAL_STATE);
  const instance = getAxiosInstace();

  const createInterview = async (interview: ICreateInterviewRequest) => {
    dispatch(createInterviewPending());

    const endpoint = "/api/services/app/Interview/Create";

    try {
      const response = await instance.post(endpoint, interview);

      if (response.status === 200) {
        dispatch(createInterviewSuccess(response.data.result));
        return response.data.result;
      }
    } catch (error) {
      console.error("Error creating interview:", error);
      dispatch(
        createInterviewError(error.message || "Failed to create interview")
      );
      throw error;
    }
  };

  const getInterview = async (id: string) => {
    dispatch(getInterviewPending());

    const endpoint = `/api/services/app/Interview/Get?id=${id}`;

    try {
      const response = await instance.get(endpoint);

      if (response.status === 200) {
        dispatch(getInterviewSuccess(response.data.result));
        return response.data.result;
      }
    } catch (error) {
      console.error("Error getting interview:", error);
      dispatch(getInterviewError(error.message || "Failed to get interview"));
      throw error;
    }
  };

  const getInterviewsByJobApplication = async (jobApplicationId: string) => {
    dispatch(getInterviewsByJobApplicationPending());

    const endpoint = `/api/services/app/Interview/GetAllByJobApplication?jobApplicationId=${jobApplicationId}`;

    try {
      const response = await instance.get(endpoint);

      if (response.status === 200) {
        dispatch(getInterviewsByJobApplicationSuccess(response.data.result));
        return response.data.result;
      }
    } catch (error) {
      console.error("Error getting interviews:", error);
      dispatch(
        getInterviewsByJobApplicationError(
          error.message || "Failed to get interviews"
        )
      );
      throw error;
    }
  };

  const updateInterview = async (interview: IInterview) => {
    dispatch(updateInterviewPending());

    const endpoint = `/api/services/app/Interview/Update`;

    try {
      const response = await instance.put(endpoint, interview);

      if (response.status === 200) {
        dispatch(updateInterviewSuccess(response.data.result));
        return response.data.result;
      }
    } catch (error) {
      console.error("Error updating interview:", error);
      dispatch(
        updateInterviewError(error.message || "Failed to update interview")
      );
      throw error;
    }
  };

  const deleteInterview = async (id: string) => {
    dispatch(deleteInterviewPending());

    const endpoint = `/api/services/app/Interview/Delete?id=${id}`;

    try {
      const response = await instance.delete(endpoint);

      if (response.status === 200) {
        dispatch(deleteInterviewSuccess());
        return;
      }
    } catch (error) {
      console.error("Error deleting interview:", error);
      dispatch(
        deleteInterviewError(error.message || "Failed to delete interview")
      );
      throw error;
    }
  };

  return (
    <InterviewStateContext.Provider value={state}>
      <InterviewActionContext.Provider
        value={{
          createInterview,
          getInterview,
          getInterviewsByJobApplication,
          updateInterview,
          deleteInterview,
        }}
      >
        {children}
      </InterviewActionContext.Provider>
    </InterviewStateContext.Provider>
  );
};

export const useInterviewState = () => {
  const context = useContext(InterviewStateContext);
  if (!context) {
    throw new Error(
      "useInterviewState must be used within an InterviewProvider"
    );
  }
  return context;
};

export const useInterviewActions = () => {
  const context = useContext(InterviewActionContext);
  if (!context) {
    throw new Error(
      "useInterviewActions must be used within an InterviewProvider"
    );
  }
  return context;
};
