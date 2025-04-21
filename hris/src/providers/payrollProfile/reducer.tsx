import { handleActions } from "redux-actions";
import { PayrollActionEnums } from "./actions";
import { INITIAL_STATE, IPayrollStateContext } from "./context";

export const PayrollReducer = handleActions<IPayrollStateContext>(
  {
    [PayrollActionEnums.getAllNamedPending]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [PayrollActionEnums.getAllNamedSuccess]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [PayrollActionEnums.getAllNamedError]: (state, action) => ({
      ...state,
      ...action.payload,
    }),

    ////GET Payrollprofile
    [PayrollActionEnums.getPayrollProfilePending]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [PayrollActionEnums.getPayrollProfileSuccess]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [PayrollActionEnums.getPayrollProfileError]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
  },
  INITIAL_STATE
);
