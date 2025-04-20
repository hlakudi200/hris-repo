"use client";

import { createContext } from "react";
import { IUser } from "../auth/context";

export interface IEmployee {
  id: string;
  employeeNumber: string;
  userId: number;
  fullName?: string;
  surname?: string;
  email?: string;
  username?: string;
  contactNo: string;
  dateOfBirth: Date;
  nationalIdNumber: string;
  user?:IUser
  hireDate: Date;
  position: string;
  department: string;
  managerId: string;
  documents: IEmployeeDocument[];
  roleNames?: string[];
}

export interface ICreateEmployeeRequest {
  fullName: string;
  surname: string;
  email: string;
  username: string;
  password: string;
  employeeNumber: string;
  contactNo: string;
  dateOfBirth: Date | string;
  nationalIdNumber: string;
  hireDate: Date | string;
  position: string;
  department: string;
  managerId: string;
  roleNames: string[];
}

export interface IEmployeeDocument {
  employeeId: string;
  file: File;
  documentType: string;
  filePath: string;
  uploadDate: Date;
}

export interface ILeaves {
  annual: number;
  sick: number;
  study: number;
  familyResponsibility: number;
}

export interface IPayrollProfile {
  employeeId: string;
  basicSalary: number;
  taxRate: number;
  id: string;
}

export interface IEmployeeStateContext {
  isPending: boolean;
  isSuccess: boolean;
  isError: boolean;
  currentEmployee?: IEmployee;
  employees?: IEmployee[];
  leaves?: ILeaves;
  payrollProfile?: IPayrollProfile;
  errorMessage?: string;
}

export interface IEmployeeActionContext {
  createEmployee: (employee: ICreateEmployeeRequest) => Promise<void>;
  getEmployee: (userId: number) => Promise<void>;
  getLeaves: (employeeId: string) => Promise<void>;
  updateEmployee: (employee: IEmployee) => Promise<void>;
  getPayrollProfile: (employeeId: string) => Promise<void>;
  getAllEmployees: () => Promise<void>;
  deleteEmployee: (id: string) => Promise<void>;
}

export const INITIAL_STATE: IEmployeeStateContext = {
  isPending: false,
  isSuccess: false,
  isError: false,
};

export const EmployeeStateContext =
  createContext<IEmployeeStateContext>(INITIAL_STATE);
export const EmployeeActionContext =
  createContext<IEmployeeActionContext>(undefined);
