"use client";

import { createContext } from "react";

export interface IEmployee {
  Id: string,
  employeeNumber: string;
  userId: number;
  contactNo: string;
  dateOfBirth: Date;
  nationalIdNumber: string;
  hireDate: Date;
  position: string;
  department: string;
  managerId: string;
  documents: IEmployeeDocument[];
}

export interface ICreateEmployeeRequest {
  name: string;
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
  study: number
  familyResponsibility: number;
}

export interface IEmployeeStateContext {
  isPending: boolean;
  isSuccess: boolean;
  isError: boolean;
  currentEmployee?: IEmployee;
  leaves?: ILeaves;
  errorMessage?: string;
}

export interface IEmployeeActionContext {
  createEmployee: (employee: ICreateEmployeeRequest) => Promise<void>;
  getEmployee: (userId: number) => Promise<void>;
  getLeaves: (employeeId: string) => Promise<void>;
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
