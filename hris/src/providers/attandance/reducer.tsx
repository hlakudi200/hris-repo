import { handleActions } from "redux-actions";
import { INITIAL_STATE, IAttandanceStateContext } from "./context";
import { AttandanceActionEnums } from "./actions";

export const AttandanceReducer = handleActions<
  IAttandanceStateContext,
  IAttandanceStateContext
>(
  {
    //get all  attencances
    [AttandanceActionEnums.getAttandancesPending]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [AttandanceActionEnums.getAttandancesSuccess]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [AttandanceActionEnums.getAttandancesError]: (state, action) => ({
      ...state,
      ...action.payload,
    }),

    //get all projects
    [AttandanceActionEnums.getProjectsPending]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [AttandanceActionEnums.getProjectsSuccess]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [AttandanceActionEnums.getProjectsError]: (state, action) => ({
      ...state,
      ...action.payload,
    }),

    //get weekly hours
    [AttandanceActionEnums.getWeeklyHoursPending]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [AttandanceActionEnums.getWeeklyHoursSuccess]: (state, { payload }) => ({
      ...state,
      isPending: false,
      isSuccess: true,
      isError: false,
      weeklyHours: payload.weeklyHours,
    }),
    [AttandanceActionEnums.getWeeklyHoursError]: (state, action) => ({
      ...state,
      ...action.payload,
    }),

    //get attandance
    [AttandanceActionEnums.getAttandancePending]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [AttandanceActionEnums.getAttandanceSuccess]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [AttandanceActionEnums.getAttandanceError]: (state, action) => ({
      ...state,
      ...action.payload,
    }),

    //create attendance
    [AttandanceActionEnums.createAttandancePending]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [AttandanceActionEnums.createAttandanceSuccess]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [AttandanceActionEnums.createAttandanceError]: (state, action) => ({
      ...state,
      ...action.payload,
    }),

    //create Projects 
    [AttandanceActionEnums.createProjectPending]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [AttandanceActionEnums.createProjectSuccess]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [AttandanceActionEnums.createProjectError]: (state, action) => ({
      ...state,
      ...action.payload,
    }),

    //update attendance record
    [AttandanceActionEnums.updateAttandancePending]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [AttandanceActionEnums.updateAttandanceSuccess]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [AttandanceActionEnums.updateAttandanceError]: (state, action) => ({
      ...state,
      ...action.payload,
    }),

    //delete attendance record
    [AttandanceActionEnums.deleteAttandancePending]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [AttandanceActionEnums.deleteAttandanceSuccess]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [AttandanceActionEnums.deleteAttandanceError]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
  },
  INITIAL_STATE
);
