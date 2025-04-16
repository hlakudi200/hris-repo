// "use client";

// import { useContext, useReducer } from "react";
// import { EmployeeReducer } from "./reducer";
// import {
//   EmployeeActionContext,
//   EmployeeStateContext,
//   ICreateEmployeeRequest,
//   IEmployee,
//   INITIAL_STATE,
//   IPayrollProfile,
// } from "./context";
// import {
//   createEmployeeError,
//   createEmployeePending,
//   createEmployeeSuccess,
//   getEmployeeError,
//   getEmployeePending,
//   getEmployeeSuccess,
//   getLeavesError,
//   getLeavesPending,
//   getLeavesSuccess,
//   getPayrollProfileError,
//   getPayrollProfilePending,
//   getPayrollProfileSuccess,
//   updateEmployeeError,
//   updateEmployeePending,
//   updateEmployeeSuccess,
// } from "./actions";
// import { getAxiosInstace } from "@/utils/axios-instance";

// export const EmployeeProvider = ({
//   children,
// }: {
//   children: React.ReactNode;
// }) => {
//   const [state, dispatch] = useReducer(EmployeeReducer, INITIAL_STATE);
//   const instance = getAxiosInstace();

//   const createEmployee = async (employee: ICreateEmployeeRequest) => {
//     dispatch(createEmployeePending());

//     const endpoint = "/api/services/app/Employee/Create";

//     await instance
//       .post(endpoint, employee)
//       .then((response) => {
//         if (response.status === 200) {
//           dispatch(createEmployeeSuccess(response.data.result));
//         }
//       })

//       .catch((error) => {
//         console.error("Error creating employee:", error);
//         dispatch(
//           createEmployeeError(error.message || "Failed to create employee")
//         );
//       });
//   };

//   const getEmployee = async (userId: number) => {
//     dispatch(getEmployeePending());

//     //TODO: Add endpoint
//     const endpoint: string = `/api/services/app/Employee/GetEmployeeById?userId=${userId}`;

//     await instance
//       .get(endpoint)
//       .then((response) => {
//         dispatch(getEmployeeSuccess(response.data.result));
//       })
//       .catch((error) => {
//         console.error(error);
//         dispatch(getEmployeeError());
//       });
//   };

//   const getLeaves = async (employeeId: string) => {
//     dispatch(getLeavesPending());

//     const endpoint: string = `/api/services/app/Leave/GetByEmpId?employeeId=${employeeId}`;

//     await instance
//       .get(endpoint)
//       .then((response) => {
//         dispatch(getLeavesSuccess(response.data.result));
//       })
//       .catch((error) => {
//         console.error(error);
//         dispatch(getLeavesError());
//       });
//   };

//   // In EmployeeProvider, add this new function
//   const updateEmployee = async (employee: IEmployee) => {
//     dispatch(updateEmployeePending());

//     const endpoint = "/api/services/app/Employee/Update";

//     try {
//       const response = await instance.put(endpoint, employee);
//       if (response.status === 200) {
//         dispatch(updateEmployeeSuccess(response.data.result));
//         return response.data.result;
//       }
//     } catch (error) {
//       console.error("Error updating employee:", error);
//       dispatch(
//         updateEmployeeError(error.message || "Failed to update employee")
//       );
//       throw error;
//     }
//   };

//   const getPayrollProfile = async (employeeId: string) => {
//     dispatch(getPayrollProfilePending());

//     const endpoint = `/api/services/app/PayrollProfile/GetByEmpId?empId=${employeeId}`;

//     await instance
//       .get(endpoint)
//       .then((response) => {
//         if (response.status === 200) {
//           const payrollProfile: IPayrollProfile = response.data.result;
//           dispatch(getPayrollProfileSuccess(payrollProfile));
//         }
//       })
//       .catch((error) => {
//         console.error(error);
//         dispatch(getPayrollProfileError());
//       });
//   };

//   return (
//     <EmployeeStateContext.Provider value={state}>
//       <EmployeeActionContext.Provider
//         value={{
//           createEmployee,
//           getEmployee,
//           getLeaves,
//           updateEmployee,
//           getPayrollProfile,
//         }}
//       >
//         {children}
//       </EmployeeActionContext.Provider>
//     </EmployeeStateContext.Provider>
//   );
// };

// export const useEmployeeState = () => {
//   const context = useContext(EmployeeStateContext);
//   if (!context) {
//     throw new Error("useEmployeeState must be used within an EmployeeProvider");
//   }
//   return context;
// };

// export const useEmployeeActions = () => {
//   const context = useContext(EmployeeActionContext);
//   if (!context) {
//     throw new Error(
//       "useEmployeeActions must be used within an EmployeeProvider"
//     );
//   }
//   return context;
// };
// UPDATED: index.tsx
"use client";

import { useContext, useReducer } from "react";
import { EmployeeReducer } from "./reducer";
import {
  EmployeeActionContext,
  EmployeeStateContext,
  ICreateEmployeeRequest,
  IEmployee,
  INITIAL_STATE,
  IPayrollProfile,
} from "./context";
import {
  createEmployeeError,
  createEmployeePending,
  createEmployeeSuccess,
  deleteEmployeeError,
  deleteEmployeePending,
  deleteEmployeeSuccess,
  getAllEmployeesError,
  getAllEmployeesPending,
  getAllEmployeesSuccess,
  getEmployeeError,
  getEmployeePending,
  getEmployeeSuccess,
  getLeavesError,
  getLeavesPending,
  getLeavesSuccess,
  getPayrollProfileError,
  getPayrollProfilePending,
  getPayrollProfileSuccess,
  updateEmployeeError,
  updateEmployeePending,
  updateEmployeeSuccess,
} from "./actions";
import { getAxiosInstace } from "@/utils/axios-instance";

export const EmployeeProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, dispatch] = useReducer(EmployeeReducer, INITIAL_STATE);
  const instance = getAxiosInstace();

  const createEmployee = async (employee: ICreateEmployeeRequest) => {
    dispatch(createEmployeePending());

    const endpoint = "/api/services/app/Employee/Create";

    try {
      const response = await instance.post(endpoint, employee);
      if (response.status === 200) {
        dispatch(createEmployeeSuccess(response.data.result));
        // After successfully creating an employee, fetch all employees
        await getAllEmployees();
        return response.data.result;
      }
    } catch (error) {
      console.error("Error creating employee:", error);
      dispatch(
        createEmployeeError(error.message || "Failed to create employee")
      );
      throw error;
    }
  };

  const getEmployee = async (userId: number) => {
    dispatch(getEmployeePending());

    //TODO: Add endpoint
    const endpoint: string = `/api/services/app/Employee/GetEmployeeById?userId=${userId}`;

    await instance
      .get(endpoint)
      .then((response) => {
        dispatch(getEmployeeSuccess(response.data.result));
      })
      .catch((error) => {
        console.error(error);
        dispatch(getEmployeeError());
      });
  };

  const getLeaves = async (employeeId: string) => {
    dispatch(getLeavesPending());

    const endpoint: string = `/api/services/app/Leave/GetByEmpId?employeeId=${employeeId}`;

    await instance
      .get(endpoint)
      .then((response) => {
        dispatch(getLeavesSuccess(response.data.result));
      })
      .catch((error) => {
        console.error(error);
        dispatch(getLeavesError());
      });
  };

  const updateEmployee = async (employee: IEmployee) => {
    dispatch(updateEmployeePending());

    const endpoint = "/api/services/app/Employee/Update";

    try {
      const response = await instance.put(endpoint, employee);
      if (response.status === 200) {
        dispatch(updateEmployeeSuccess(response.data.result));
        // After successfully updating an employee, fetch all employees
        await getAllEmployees();
        return response.data.result;
      }
    } catch (error) {
      console.error("Error updating employee:", error);
      dispatch(
        updateEmployeeError(error.message || "Failed to update employee")
      );
      throw error;
    }
  };

  const getPayrollProfile = async (employeeId: string) => {
    dispatch(getPayrollProfilePending());

    const endpoint = `/api/services/app/PayrollProfile/GetByEmpId?empId=${employeeId}`;

    await instance
      .get(endpoint)
      .then((response) => {
        if (response.status === 200) {
          const payrollProfile: IPayrollProfile = response.data.result;
          dispatch(getPayrollProfileSuccess(payrollProfile));
        }
      })
      .catch((error) => {
        console.error(error);
        dispatch(getPayrollProfileError());
      });
  };

  // Implement getAllEmployees function
  const getAllEmployees = async () => {
    dispatch(getAllEmployeesPending());

    const endpoint = "/api/services/app/Employee/GetAll";

    try {
      const response = await instance.get(endpoint);

      if (response.status === 200 && response.data && response.data.result) {
        // Ensure we're getting the items array from the response
        debugger;
        const employees = Array.isArray(response.data.result.items)
          ? response.data.result.items
          : response.data.result;
        debugger;
        dispatch(getAllEmployeesSuccess(employees));
        return employees;
      } else {
        throw new Error("Invalid response format");
      }
    } catch (error) {
      debugger;
      console.error("Error fetching employees:", error);
      dispatch(
        getAllEmployeesError(error.message || "Failed to fetch employees")
      );
      throw error;
    }
  };

  // Implement deleteEmployee function
  const deleteEmployee = async (id: string) => {
    dispatch(deleteEmployeePending());

    const endpoint = `/api/services/app/Employee/Delete?id=${id}`;

    try {
      const response = await instance.delete(endpoint);
      if (response.status === 200) {
        dispatch(deleteEmployeeSuccess());
        // After successfully deleting an employee, fetch all employees
        await getAllEmployees();
        return;
      }
    } catch (error) {
      console.error("Error deleting employee:", error);
      dispatch(
        deleteEmployeeError(error.message || "Failed to delete employee")
      );
      throw error;
    }
  };

  return (
    <EmployeeStateContext.Provider value={state}>
      <EmployeeActionContext.Provider
        value={{
          createEmployee,
          getEmployee,
          getLeaves,
          updateEmployee,
          getPayrollProfile,
          getAllEmployees,
          deleteEmployee,
        }}
      >
        {children}
      </EmployeeActionContext.Provider>
    </EmployeeStateContext.Provider>
  );
};

export const useEmployeeState = () => {
  const context = useContext(EmployeeStateContext);
  if (!context) {
    throw new Error("useEmployeeState must be used within an EmployeeProvider");
  }
  return context;
};

export const useEmployeeActions = () => {
  const context = useContext(EmployeeActionContext);
  if (!context) {
    throw new Error(
      "useEmployeeActions must be used within an EmployeeProvider"
    );
  }
  return context;
};
