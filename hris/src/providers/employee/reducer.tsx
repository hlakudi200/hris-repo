// import { handleActions } from "redux-actions";
// import { INITIAL_STATE, IEmployeeStateContext } from "./context";
// import { EmployeeActionEnums } from "./actions";

// export const EmployeeReducer = handleActions<IEmployeeStateContext>(
//   {
//     [EmployeeActionEnums.getEmployeePending]: (state, action) => ({
//       ...state,
//       ...action.payload,
//     }),
//     [EmployeeActionEnums.getEmployeeSuccess]: (state, action) => ({
//       ...state,
//       ...action.payload,
//     }),
//     [EmployeeActionEnums.getEmployeeError]: (state, action) => ({
//       ...state,
//       ...action.payload,
//     }),

//     [EmployeeActionEnums.getLeavesPending]: (state, action) => ({
//       ...state,
//       ...action.payload,
//     }),
//     [EmployeeActionEnums.getLeavesSuccess]: (state, action) => ({
//       ...state,
//       ...action.payload,
//     }),
//     [EmployeeActionEnums.getLeavesError]: (state, action) => ({
//       ...state,
//       ...action.payload,
//     }),

//     // Add these new reducers
//     [EmployeeActionEnums.updateEmployeePending]: (state, action) => ({
//       ...state,
//       ...action.payload,
//     }),
//     [EmployeeActionEnums.updateEmployeeSuccess]: (state, action) => ({
//       ...state,
//       ...action.payload,
//     }),
//     [EmployeeActionEnums.updateEmployeeError]: (state, action) => ({
//       ...state,
//       ...action.payload,
//     }),

//     [EmployeeActionEnums.getPayrollProfilePending]: (state, action) => ({
//       ...state,
//       ...action.payload,
//     }),
//     [EmployeeActionEnums.getPayrollProfileSuccess]: (state, action) => ({
//       ...state,
//       ...action.payload,
//     }),
//     [EmployeeActionEnums.getPayrollProfileError]: (state, action) => ({
//       ...state,
//       ...action.payload,
//     }),
//   },
//   INITIAL_STATE
// );

// UPDATED: reducer.tsx
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

    // Add these new reducers
    [EmployeeActionEnums.updateEmployeePending]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [EmployeeActionEnums.updateEmployeeSuccess]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [EmployeeActionEnums.updateEmployeeError]: (state, action) => ({
      ...state,
      ...action.payload,
    }),

    [EmployeeActionEnums.getPayrollProfilePending]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [EmployeeActionEnums.getPayrollProfileSuccess]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [EmployeeActionEnums.getPayrollProfileError]: (state, action) => ({
      ...state,
      ...action.payload,
    }),

    // Add new getAllEmployees reducers
    [EmployeeActionEnums.getAllEmployeesPending]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [EmployeeActionEnums.getAllEmployeesSuccess]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [EmployeeActionEnums.getAllEmployeesError]: (state, action) => ({
      ...state,
      ...action.payload,
    }),

    // Add new deleteEmployee reducers
    [EmployeeActionEnums.deleteEmployeePending]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [EmployeeActionEnums.deleteEmployeeSuccess]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [EmployeeActionEnums.deleteEmployeeError]: (state, action) => ({
      ...state,
      ...action.payload,
    }),

    // Add createEmployee reducers
    [EmployeeActionEnums.createEmployeePending]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [EmployeeActionEnums.createEmployeeSuccess]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [EmployeeActionEnums.createEmployeeError]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
  },
  INITIAL_STATE
);
