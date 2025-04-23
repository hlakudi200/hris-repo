"use client";
import { getAxiosInstace } from "../../utils/axios-instance";
import {
  INITIAL_STATE,
  IJobApplicant,
  JobApplicantActionContext,
  JobApplicantStateContext
} from "./context";
import { ApplicantReducer } from "./reducer";
import { useContext, useReducer } from "react";
import {
    createApplicantPending,
 createApplicantSuccess,
 getApplicantByIdError,
 getApplicantByIdPending,
 getApplicantByIdSuccess,
 createApplicantError,
 updateApplicantPending,
 updateApplicantSuccess,
 updateApplicantError,
 getApplicantJobApplicationsPending,
 getApplicantJobApplicationsSuccess,
 getApplicantJobApplicationsError
} from "./actions";

export const ApplicantProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, dispatch] = useReducer(ApplicantReducer, INITIAL_STATE);
  const instance = getAxiosInstace();



  const getApplicantById = async (userId: number) => {
    dispatch(getApplicantByIdPending());
    const endpoint = `/api/services/app/JobApplicant/GetJobApplicantById?UserId=${userId}`;
    await instance
      .get(endpoint)
      .then((response) => {
        dispatch(getApplicantByIdSuccess(response.data.result));
      })
      .catch((error) => {
        console.error(error);
        dispatch(getApplicantByIdError());
      });
  };

  const createApplicant = async (applicant: IJobApplicant) => {
    dispatch(createApplicantPending());
    const endpoint = `/api/services/app/JobApplicant/Create`;
    await instance
      .post(endpoint, applicant)
      .then((response) => {
        dispatch(createApplicantSuccess(response.data.result));
      })
      .catch((error) => {
        console.error(error);
        dispatch(createApplicantError());
      });
  };
  const getApplicantJobApplications=async(applicantId:string)=>{
    dispatch(getApplicantJobApplicationsPending());
       const endpoint =`/api/services/app/JobApplication/GetAllJobApplicationsById?applicantId=${applicantId}`;
       
       await instance
       .get(endpoint)
       .then((response)=>{
        dispatch(getApplicantJobApplicationsSuccess(response.data.result))
       })
       .catch((err)=>{
        console.error(err)
        dispatch(getApplicantJobApplicationsError())
       })
  } 


  const updateApplicant = async (applicant: IJobApplicant) => {
    dispatch(updateApplicantPending());
    const endpoint = `/api/services/app/JobApplicant/Update`;
    await instance
      .put(endpoint, applicant)
      .then((response) => {
        dispatch(updateApplicantSuccess(response.data.result));
      })
      .catch((error) => {
        console.error(error);
        dispatch(updateApplicantError());
      });
  };

  
  return (
    <JobApplicantStateContext.Provider value={state}>
      <JobApplicantActionContext.Provider
        value={{
            getApplicantById,
            createApplicant,
            updateApplicant,
            getApplicantJobApplications
        }}
      >
        {children}
      </JobApplicantActionContext.Provider>
    </JobApplicantStateContext.Provider>
  );
};

export const useApplicantState = () => {
  const context = useContext(JobApplicantStateContext);
  if (!context) {
    throw new Error(
      "useApplicantState must be used within a ApplicantPProvider"
    );
  }
  return context;
};

export const useApplicantActions = () => {
  const context = useContext(JobApplicantActionContext);
  if (!context) {
    throw new Error(
      "useApplicantActions must be used within a ApplicantProvider"
    );
  }
  return context;
};
