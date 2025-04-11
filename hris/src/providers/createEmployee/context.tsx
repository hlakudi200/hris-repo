"use client";

import { createContext } from "react";

export interface IEmployee {
  name: string;
  surname: string;
  email: string;
  username: string;
  password: string;
  employeeNumber: string;
  contactNo: string;
  dateOfBirth: Date;
  nationalIdNumber: string;
  hireDate: Date;
  position: string;
  department: string;
  managerId: string;
  roleNames: string[];
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

export interface IEmployeeStateContext {
  isPending: boolean;
  isSuccess: boolean;
  isError: boolean;
  currentEmployee?: IEmployee;
  errorMessage?: string;
}

export interface IEmployeeActionContext {
  getEmployee: (employeeNumber: string) => Promise<void>;
  createEmployee: (employee: ICreateEmployeeRequest) => Promise<void>;
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
