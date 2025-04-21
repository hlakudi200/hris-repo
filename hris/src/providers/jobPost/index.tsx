"use client";
import { getAxiosInstace } from "../../utils/axios-instance";
import {
  INITIAL_STATE,
  JobPostingActionContext,
  JobPostingStateContext,
} from "./context";
import { JobPostingReducer } from "./reducer";
import { useContext, useReducer } from "react";
import {
  getJobPostingsError,
  getJobPostingsPending,
  getJobPostingsSuccess,
  getJobPostingError,
  getJobPostingPending,
  getJobPostingSuccess,
  createJobPostingPending,
  createJobPostingError,
  updateJobPostingSuccess,
  createJobPostingSuccess,
  updateJobPostingPending,
  updateJobPostingError,
  deleteJobPostingPending,
  deleteJobPostingSuccess,
  deleteJobPostingError,
  getJobPostingIncludedPending,
  getJobPostingIncludedSuccess,
  getJobPostingIncludedError,
} from "./actions";
import { IJobPosting } from "./interfaces";

export const JobPostingProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, dispatch] = useReducer(JobPostingReducer, INITIAL_STATE);
  const instance = getAxiosInstace();

  const getJobPostings = async () => {
    dispatch(getJobPostingsPending());
    try {
      const response = await instance.get(
        "/api/services/app/JobPosting/GetAll",
        {
          params: {
            Sorting: "",
            SkipCount: 0,
            MaxResultCount: 10,
          },
        }
      );
      dispatch(getJobPostingsSuccess(response.data.result.items));
    } catch (error) {
      console.error("API Error:", error);
      dispatch(getJobPostingsError());
    }
  };

  //get job posting include :
  const getJobPostingIncluded = async () => {
    dispatch(getJobPostingIncludedPending());
    try {
      const response = await instance.get(
        "/api/services/app/JobPosting/GetAllInclude",
        {
          params: {
            Sorting: "",
            SkipCount: 0,
            MaxResultCount: 10,
          },
        }
      );
      dispatch(getJobPostingIncludedSuccess(response.data.result));
    } catch (error) {
      console.error("API Error:", error);
      dispatch(getJobPostingIncludedError());
    }
  };

  const getJobPosting = async (id: string) => {
    dispatch(getJobPostingPending());
    const endpoint = `/api/services/app/JobPosting/Get/${id}`;
    await instance
      .get(endpoint)
      .then((response) => {
        dispatch(getJobPostingSuccess(response.data));
      })
      .catch((error) => {
        console.error(error);
        dispatch(getJobPostingError());
      });
  };

  const createJobPosting = async (JobPosting: IJobPosting) => {
    dispatch(createJobPostingPending());
    const endpoint = `/api/services/app/JobPosting/Create`;
    await instance
      .post(endpoint, JobPosting)
      .then((response) => {
        dispatch(createJobPostingSuccess(response.data));
      })
      .catch((error) => {
        console.error(error);
        dispatch(createJobPostingError());
      });
  };

  const updateJobPosting = async (JobPosting: IJobPosting) => {
    dispatch(updateJobPostingPending());
    const endpoint = `/api/services/app/JobPosting/Update/${JobPosting.id}`;
    await instance
      .put(endpoint, JobPosting)
      .then((response) => {
        dispatch(updateJobPostingSuccess(response.data));
      })
      .catch((error) => {
        console.error(error);
        dispatch(updateJobPostingError());
      });
  };

  const deleteJobPosting = async (id: string) => {
    dispatch(deleteJobPostingPending());
    try {
      await instance.delete(`/api/services/app/JobPosting/Delete/${id}`);
      dispatch(deleteJobPostingSuccess(id));
    } catch (error) {
      console.error("Delete Error:", error);
      dispatch(deleteJobPostingError());
    }
  };

  return (
    <JobPostingStateContext.Provider value={state}>
      <JobPostingActionContext.Provider
        value={{
          getJobPostings,
          getJobPosting,
          createJobPosting,
          updateJobPosting,
          deleteJobPosting,
          getJobPostingIncluded,
        }}
      >
        {children}
      </JobPostingActionContext.Provider>
    </JobPostingStateContext.Provider>
  );
};

export const useJobPostingState = () => {
  const context = useContext(JobPostingStateContext);
  if (!context) {
    throw new Error(
      "useJobPostingState must be used within a JobPostingProvider"
    );
  }
  return context;
};

export const useJobPostingActions = () => {
  const context = useContext(JobPostingActionContext);
  if (!context) {
    throw new Error(
      "useJobPostingActions must be used within a JobPostingProvider"
    );
  }
  return context;
};
