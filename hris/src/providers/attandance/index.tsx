"use client";
import { getAxiosInstace } from "../../utils/axios-instance";
import {
  INITIAL_STATE,
  IAttandance,
  AttandanceActionContext,
  AttandanceStateContext,
  IWeeklyHoursResponse,
} from "./context";
import { AttandanceReducer } from "./reducer";
import { useContext, useReducer } from "react";
import {
  getAttandancesError,
  getAttandancesPending,
  getAttandancesSuccess,
  getAttandanceError,
  getAttandancePending,
  getAttandanceSuccess,
  createAttandancePending,
  createAttandanceError,
  updateAttandanceSuccess,
  createAttandanceSuccess,
  updateAttandancePending,
  updateAttandanceError,
  deleteAttandancePending,
  deleteAttandanceSuccess,
  deleteAttandanceError,
  getWeeklyHoursSuccess,
  getWeeklyHoursPending,
  getWeeklyHoursError,
  getProjectsPending,
  getProjectsSuccess,
  getProjectsError,
} from "./actions";

export const AttandanceProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, dispatch] = useReducer(AttandanceReducer, INITIAL_STATE);
  const instance = getAxiosInstace();

  const getAttandances = async () => {
    dispatch(getAttandancesPending());
    const endpoint = `/api/services/app/AttendanceRecord`;
    await instance
      .get(endpoint)
      .then((response) => {
        dispatch(getAttandancesSuccess(response.data));
      })
      .catch((error) => {
        console.error(error);
        dispatch(getAttandancesError());
      });
  };

  const getProjects = async () => {
    dispatch(getProjectsPending());
    const endpoint = `/api/services/app/Project/GetAll`;
    await instance
      .get(endpoint)

      .then((response) => {
        dispatch(getProjectsSuccess(response.data.result.items));
        console.log("Projects", response.data.result);
      })
      .catch((error) => {
        console.error(error);
        dispatch(getProjectsError());
      });
  };

  const getWeeklyHours = async (employeeId: string) => {
    try {
      dispatch(getWeeklyHoursPending());
      const response = await instance.get<IWeeklyHoursResponse>(
        `/api/services/app/AttendanceRecord/GetWeeklyHours`,
        { params: { employeeId } }
      );
      dispatch(getWeeklyHoursSuccess(response.data.result));
    } catch (error) {
      dispatch(getWeeklyHoursError());
      throw error;
    }
  };

  const getAttandance = async (id: string) => {
    dispatch(getAttandancePending());
    const endpoint = `/api/services/app/AttendanceRecord/${id}`;
    await instance
      .get(endpoint)
      .then((response) => {
        dispatch(getAttandanceSuccess(response.data));
      })
      .catch((error) => {
        console.error(error);
        dispatch(getAttandanceError());
      });
  };

  const createAttandance = async (Attandance: IAttandance) => {
    dispatch(createAttandancePending());
    const endpoint = `/api/services/app/AttendanceRecord/Create`;
    await instance
      .post(endpoint, Attandance)
      .then((response) => {
        dispatch(createAttandanceSuccess(response.data));
      })
      .catch((error) => {
        console.error(error);
        dispatch(createAttandanceError());
      });
  };

  const updateAttandance = async (Attandance: IAttandance) => {
    dispatch(updateAttandancePending());
    const endpoint = `/api/services/app/AttendanceRecord/${Attandance.id}`;
    await instance
      .put(endpoint, Attandance)
      .then((response) => {
        dispatch(updateAttandanceSuccess(response.data));
      })
      .catch((error) => {
        console.error(error);
        dispatch(updateAttandanceError());
      });
  };

  const deleteAttandance = async (id: string) => {
    dispatch(deleteAttandancePending());
    const endpoint = `https://fakestoreapi.com/Attandances/${id}`;
    await instance
      .delete(endpoint)
      .then((response) => {
        dispatch(deleteAttandanceSuccess(response.data));
      })
      .catch((error) => {
        console.error(error);
        dispatch(deleteAttandanceError());
      });
  };

  return (
    <AttandanceStateContext.Provider value={state}>
      <AttandanceActionContext.Provider
        value={{
          getAttandances,
          getAttandance,
          getWeeklyHours,
          createAttandance,
          updateAttandance,
          deleteAttandance,
          getProjects,
        }}
      >
        {children}
      </AttandanceActionContext.Provider>
    </AttandanceStateContext.Provider>
  );
};

export const useAttandanceState = () => {
  const context = useContext(AttandanceStateContext);
  if (!context) {
    throw new Error(
      "useAttandanceState must be used within a AttandanceProvider"
    );
  }
  return context;
};

export const useAttandanceActions = () => {
  const context = useContext(AttandanceActionContext);
  if (!context) {
    throw new Error(
      "useAttandanceActions must be used within a AttandanceProvider"
    );
  }
  return context;
};
