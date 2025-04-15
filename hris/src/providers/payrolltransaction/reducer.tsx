import { handleActions } from "redux-actions";
import {
  IPayrollTransactionStateContext,
  INITIAL_STATE,
} from "@/providers/payrolltransaction/context";
import { PayrollTransactionActionEnums } from "./actions";

export const PayrollTransactionReducer =
  handleActions<IPayrollTransactionStateContext>(
    {
      [PayrollTransactionActionEnums.createPayrollTransactionPending]: (
        state,
        action
      ) => ({
        ...state,
        ...action.payload,
      }),
      [PayrollTransactionActionEnums.createPayrollTransactionSuccess]: (
        state,
        action
      ) => ({
        ...state,
        ...action.payload,
      }),
      [PayrollTransactionActionEnums.createPayrollTransactionError]: (
        state,
        action
      ) => ({
        ...state,
        ...action.payload,
      }),
      [PayrollTransactionActionEnums.resetStateFlagsAction]: (
        state,
        action
      ) => ({
        ...state,
        ...action.payload,
      }),
    },
    INITIAL_STATE
  );
