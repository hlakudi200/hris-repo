
'use client';
import { createContext } from "react";

export interface IJobApplicant {
    id?: string; 
    userId: number;
    nationalIdNo: number;
    gender: string;
    dateofBirth: string; 
    cellphoneNo: string;
    alternativePhone: string;
    addressLine1: string;
    addressLine2: string;
    city: string;
    province: string;
    country: string;
    postalCode: string;
    highestQualification: string;
    fieldOfStudy: string;
    institution: string;
    graduationYear: string; 
    yearsOfExperience: number;
    currentEmployer: string;
    currentPosition: string;
    currentSalary: number;
    resumeUrl: string;
    coverletter: string;
    isWillingToRelocate: boolean;
    hasCriminalRecord: boolean;
  }
  
  export interface ApplicantStateContext {
    isPending: boolean;
    isSuccess: boolean;
    isError: boolean;
    applicat?:IJobApplicant
  }
  
  export interface ApplicantActionContext {
    getApplicantById: (userId: number) => void;
    createApplicant: (applicant: IJobApplicant) => void;
    updateApplicant: (applicant: IJobApplicant) => void;
  }
  
  export const INITIAL_STATE: ApplicantStateContext = {
    isPending: false,
    isSuccess: false,
    isError: false,
  };
  
  export const JobApplicantStateContext =
    createContext<ApplicantStateContext>(INITIAL_STATE);
  
  export const JobApplicantActionContext =
    createContext<ApplicantActionContext>(undefined);