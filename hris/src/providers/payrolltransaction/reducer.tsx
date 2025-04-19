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

      //send payslip
      [PayrollTransactionActionEnums.sentPaySlipPending]: (

        state,
        action
      ) => ({
        ...state,
        ...action.payload,
      }),

      [PayrollTransactionActionEnums.generatePayrollTransactionPdfSuccess]: (

      [PayrollTransactionActionEnums.sentPaySlipSuccess]: (

        state,
        action
      ) => ({
        ...state,
        ...action.payload,
      }),

      [PayrollTransactionActionEnums.generatePayrollTransactionPdfError]: (

      [PayrollTransactionActionEnums.sentPaySlipError]: (

        state,
        action
      ) => ({
        ...state,
        ...action.payload,
      }),

      //download pdf 
      [PayrollTransactionActionEnums.downloadPayrollTransactionPdfPending]: (
      //sent payslips
      [PayrollTransactionActionEnums.sentPaySlipsPending]: (
        state,
        action
      ) => ({
        ...state,
        ...action.payload,
      }),

      [PayrollTransactionActionEnums.downloadPayrollTransactionPdfSuccess]: (

      [PayrollTransactionActionEnums.sentPaySlipsSuccess]: (

        state,
        action
      ) => ({
        ...state,
        ...action.payload,
      }),

      [PayrollTransactionActionEnums.downloadPayrollTransactionPdfError]: (

      [PayrollTransactionActionEnums.sentPaySlipsError]: (

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
