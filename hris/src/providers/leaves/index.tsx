"use client";
import { getAxiosInstace } from "@/utils/axios-instance";
import { useContext, useReducer } from "react";
import { LeaveReducer } from "./reducer";
import {
  ILeaves,
  INITIAL_STATE,
  LeaveActionContext,
  LeaveStateContext,
} from "./context";
import {
  getLeavesError,
  getLeavesPending,
  getLeavesSuccess,
  resetStateFlagsAction,
  updateLeavesPending,
  updateLeavesSuccess,
} from "./actions";

export const LeaveProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(LeaveReducer, INITIAL_STATE);
  const instance = getAxiosInstace();

  const getLeaves = async (employeeId: string) => {
    dispatch(getLeavesPending());

    const endpoint: string = `/api/services/app/Leave/GetByEmpId?employeeId=${employeeId}`;

    await instance
      .get(endpoint)
      .then((response) => {
        dispatch(getLeavesSuccess(response.data.result));
      })
      .catch((error) => {
        console.error(error);
        dispatch(getLeavesError());
      });
  };
  const updateLeaves = async (leaves: ILeaves) => {
    dispatch(updateLeavesPending());

    const endpoint = `/api/services/app/Leave/Update`;

    instance
      .post(endpoint, leaves)
      .then((response) => {
        if (response.status === 200) {
          dispatch(updateLeavesSuccess());
        }
      })
      .catch((error) => {
        console.error(error);
        dispatch(getLeavesError());
      });
  };
  const resetStateFlags = () => {
    dispatch(resetStateFlagsAction());
  };
  return (
    <LeaveStateContext.Provider value={state}>
      <LeaveActionContext.Provider
        value={{ getLeaves, updateLeaves, resetStateFlags }}
      >
        {children}
      </LeaveActionContext.Provider>
    </LeaveStateContext.Provider>
  );
};

export const useLeaveState = () => {
  const context = useContext(LeaveStateContext);
  if (context === undefined) {
    throw new Error("useLeaveState must be used within a LeaveProvider");
  }
  return context;
};
export const useLeaveActions = () => {
  const context = useContext(LeaveActionContext);
  if (context === undefined) {
    throw new Error("useLeaveActions must be used within a LeaveProvider");
  }
  return context;
};
