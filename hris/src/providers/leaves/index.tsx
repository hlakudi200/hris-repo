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
  getAllLeavesError,
  getAllLeavesPending,
  getAllLeavesSuccess,
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
      .put(endpoint, leaves)
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

  const getAllLeaves = async () => {
    dispatch(getAllLeavesPending());

    const endpoint = `/api/services/app/Leave/GetAll`;

    instance
    .get(endpoint,
      {
        params: {
          Sorting: "",
          SkipCount: 0,
          MaxResultCount: 100,
        },
      })
    .then((response) => {
      if (response.status === 200){
        dispatch(getAllLeavesSuccess(response.data.result.items));
      }
    })
    .catch((error) => {
      console.error(error);
      dispatch(getAllLeavesError());
    })
  }


  const resetStateFlags = () => {
    dispatch(resetStateFlagsAction());
  };
  return (
    <LeaveStateContext.Provider value={state}>
      <LeaveActionContext.Provider
        value={{ getLeaves, updateLeaves,getAllLeaves, resetStateFlags }}
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
