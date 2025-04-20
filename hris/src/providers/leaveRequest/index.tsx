"use client";

import { getAxiosInstace } from "@/utils/axios-instance";
import { LeaveRequestReducer } from "./reducer";
import { useContext, useReducer } from "react";
import {
  ILeaveRequest,
  INITIAL_STATE,
  LeaveRequestActionContext,
  LeaveRequestStateContext,
} from "./context";
import {
  getLeaveRequestByEmpIdError,
  getLeaveRequestByEmpIdPending,
  getLeaveRequestByEmpIdSuccess,
  getLeaveRequestsError,
  getLeaveRequestsPending,
  getLeaveRequestsSuccess,
  resetStateFlagsAction,
  submitLeaveRequestError,
  submitLeaveRequestPending,
  submitLeaveRequestSuccess,
  updateLeaveRequestError,
  updateLeaveRequestPending,
  updateLeaveRequestSuccess,
} from "./actions";

export const LeaveRequestProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, dispatch] = useReducer(LeaveRequestReducer, INITIAL_STATE);
  const instance = getAxiosInstace();

  const submitLeaveRequest = async (request: ILeaveRequest) => {
    dispatch(submitLeaveRequestPending());
    const endpoint = `/api/services/app/LeaveRequest/Create`;

    instance
      .post(endpoint, request)
      .then((response) => {
        if (response.status === 200) {
          dispatch(submitLeaveRequestSuccess());
        }
      })
      .catch((error) => {
        console.error(error);
        dispatch(submitLeaveRequestError());
      });
  };

  const getByEmpId = (empId: string) => {
    dispatch(getLeaveRequestByEmpIdPending());

    const endpoint = `/api/services/app/LeaveRequest/GetByEmpId?id=${empId}`;
    instance
      .get(endpoint)
      .then((response) => {
        dispatch(getLeaveRequestByEmpIdSuccess(response.data.result));
      })
      .catch((error) => {
        console.error(error);
        dispatch(getLeaveRequestByEmpIdError());
      });
  };

  const getLeaveRequests = async () => {
    dispatch(getLeaveRequestsPending());
    const endpoint = `/api/services/app/LeaveRequest/GetAllInclude`;

    await instance
      .get(endpoint)
      .then((response) => {
        dispatch(getLeaveRequestsSuccess(response.data.result));
        console.log(response.data.result)
      })
      .catch((err) => {
        console.log(err);
        dispatch(getLeaveRequestsError());
      });
  };


  const updateLeaveRequest=async(request:ILeaveRequest)=>{
    console.log("request:",request)
    dispatch(updateLeaveRequestPending())
    const endpoint =`/api/services/app/LeaveRequest/Update`
    instance
    .put(endpoint,request)
    .then((response)=>{
      dispatch(updateLeaveRequestSuccess(response.data.result))
      console.log(response.data.result)
    }).catch((err)=>{
      console.log(err)
      dispatch(updateLeaveRequestError())
    })

  };

  const resetStateFlags = async () => {
    dispatch(resetStateFlagsAction());
  };

  return (
    <LeaveRequestStateContext.Provider value={state}>
      <LeaveRequestActionContext.Provider
        value={{submitLeaveRequest, resetStateFlags, getByEmpId,getLeaveRequests,updateLeaveRequest }}
      >
        {children}
      </LeaveRequestActionContext.Provider>
    </LeaveRequestStateContext.Provider>
  );
};

export const useLeaveRequestState = () => {
  const context = useContext(LeaveRequestStateContext);
  if (!context) {
    throw new Error(
      "useLeaveRequestState must be used within a LeaveRequestProvider"
    );
  }
  return context;
};

export const useLeaveRequestActions = () => {
  const context = useContext(LeaveRequestActionContext);
  if (!context) {
    throw new Error(
      "useLeaveRequestState must be used within a LeaveRequestProvider"
    );
  }
  return context;
};
