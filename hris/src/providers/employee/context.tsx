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

export interface IEmployeeDocument {
  employeeId: string;
  file: File;
  documentType: string;
  filePath: string;
  uploadDate: Date;
}

export interface ILeaves {
  annual: number;
  familyResponsibility: number;
  sick: number;
}

export interface IEmployeeStateContext {
  isPending: boolean;
  isSuccess: boolean;
  isError: boolean;
  currentEmployee?: IEmployee;
  leaves?: ILeaves;
}

export interface IEmployeeActionContext {
  getEmployee: (userId: number) => Promise<void>;
  getLeaves: (employeeNumber: string) => Promise<void>;
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
