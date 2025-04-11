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
  submitLeaveRequestError,
  submitLeaveRequestPending,
  submitLeaveRequestSuccess,
} from "./actions";

export const LeaveRequestProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, dispatch] = useReducer(LeaveRequestReducer, INITIAL_STATE);
  const instance = getAxiosInstace();

  const endpoint = `/api/services/app/LeaveRequest/Create`;

  const submitLeaveRequest = async (request: ILeaveRequest) => {
    dispatch(submitLeaveRequestPending());

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

  return (
    <LeaveRequestStateContext.Provider value={state}>
      <LeaveRequestActionContext.Provider value={{ submitLeaveRequest }}>
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
