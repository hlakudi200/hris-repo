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

      //get payrolltrasaction

      [PayrollTransactionActionEnums.getPayrollTransactionPending]: (
        state,
        action
      ) => ({
        ...state,
        ...action.payload,
      }),
      [PayrollTransactionActionEnums.getPayrollTransactionSuccess]: (
        state,
        action
      ) => ({
        ...state,
        ...action.payload,
      }),
      [PayrollTransactionActionEnums.getPayrollTransactionError]: (
        state,
        action
      ) => ({
        ...state,
        ...action.payload,
      }),

      //generate pdf 
      [PayrollTransactionActionEnums.generatePayrollTransactionPdfPending]: (
        state,
        action
      ) => ({
        ...state,
        ...action.payload,
      }),
      [PayrollTransactionActionEnums.generatePayrollTransactionPdfSuccess]: (
        state,
        action
      ) => ({
        ...state,
        ...action.payload,
      }),
      [PayrollTransactionActionEnums.generatePayrollTransactionPdfError]: (
        state,
        action
      ) => ({
        ...state,
        ...action.payload,
      }),
      //download pdf 
      [PayrollTransactionActionEnums.downloadPayrollTransactionPdfPending]: (
        state,
        action
      ) => ({
        ...state,
        ...action.payload,
      }),
      [PayrollTransactionActionEnums.downloadPayrollTransactionPdfSuccess]: (
        state,
        action
      ) => ({
        ...state,
        ...action.payload,
      }),
      [PayrollTransactionActionEnums.downloadPayrollTransactionPdfError]: (
        state,
        action
      ) => ({
        ...state,
        ...action.payload,
      }),
      //
      
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
