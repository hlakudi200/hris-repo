import { handleActions } from "redux-actions";
import { INITIAL_STATE, ApplicantStateContext } from "./context";
import { ApplicantActionEnums } from "./actions";

export const ApplicantReducer = handleActions<
  ApplicantStateContext,
  ApplicantStateContext
>(
  {
    //Get applicant by Id 
    [ApplicantActionEnums.getApplicantByIdPending]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [ApplicantActionEnums.getApplicantByIdSuccess]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [ApplicantActionEnums.getApplicantByIdError]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    //Get Jobapplications by Id 
    [ApplicantActionEnums.getApplicantJobApplicationsPending]: (state, action) => ({
        ...state,
        ...action.payload,
      }),
      [ApplicantActionEnums.getApplicantJobApplicationsSuccess]: (state, action) => ({
        ...state,
        ...action.payload,
      }),
      [ApplicantActionEnums.getApplicantJobApplicationsError]: (state, action) => ({
        ...state,
        ...action.payload,
      }),
  
    //Create Applicant 
    [ApplicantActionEnums.createApplicantPending]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [ApplicantActionEnums.createApplicantSuccess]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [ApplicantActionEnums.createApplicantError]: (state, action) => ({
      ...state,
      ...action.payload,
    }),

    //Update Applicant 
    [ApplicantActionEnums.updateApplicantPending]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [ApplicantActionEnums.updateApplicantSuccess]: (state,action) => ({
        ...state,
        ...action.payload,
    }),
    [ApplicantActionEnums.updateApplicantError]: (state, action) => ({
      ...state,
      ...action.payload,
    }),

    
  },
  INITIAL_STATE
);
