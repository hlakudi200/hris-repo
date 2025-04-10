import { handleActions } from "redux-actions";
import { INITIAL_STATE, IEmployeeStateContext } from "./context";
import { EmployeeActionEnums } from "./actions";

export const EmployeeReducer = handleActions<IEmployeeStateContext>(
    {
        [EmployeeActionEnums.getEmployeePending]: (state, action) => ({
            ...state,
            ...action.payload,
        }),
        [EmployeeActionEnums.getEmployeeSuccess]: (state, action) => ({
            ...state,
            ...action.payload,
        }),
        [EmployeeActionEnums.getEmployeeError]: (state, action) => ({
            ...state,
            ...action.payload,
        }),
        
        [EmployeeActionEnums.getLeavesPending]: (state, action) => ({
            ...state,
            ...action.payload,
        }),
        [EmployeeActionEnums.getLeavesSuccess]: (state, action) => ({
            ...state,
            ...action.payload,
        }),
        [EmployeeActionEnums.getLeavesError]: (state, action) => ({
            ...state,
            ...action.payload,
        }),
    },
    INITIAL_STATE
);