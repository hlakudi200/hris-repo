import { handleActions } from "redux-actions";
import { INITIAL_STATE, IAttandanceStateContext } from "./context";
import { AttandanceActionEnums } from "./actions";

export const AttandanceReducer = handleActions<IAttandanceStateContext, IAttandanceStateContext>({
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
    [AttandanceActionEnums.getWeeklyHoursPending]: (state, action) => ({
        ...state,
        ...action.payload,
    }),
    [AttandanceActionEnums.getWeeklyHoursSuccess]: (state, { payload }) => ({
        ...state,
        isPending: false,
        isSuccess: true,
        isError: false,
        weeklyHours: payload.weeklyHours
      }),
    [AttandanceActionEnums.getWeeklyHoursError]: (state, action) => ({
        ...state,
        ...action.payload,
    }),
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
}, INITIAL_STATE );
