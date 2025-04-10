"use client"

import { createContext } from "react";

export interface IUser {
  id?: string;
  userName: string;
  name: string;
  surname: string;
  emailAddress: string;
  password: string;
  roles?: IUserRole[];
}

export interface ILoginData {
  userNameOrEmailAddress: string;
  password: string;
}

export interface IUserRole {
  userId: number;
  roleId: number;
}

export interface IAuthStateContext {
  isPending: boolean;
  isSuccess: boolean;
  isError: boolean;
  currentUser?: IUser;
  jwtToken?: string;
}

export interface IAuthActionContext {
  loginUser: (loginData: ILoginData) => Promise<void>;
  getCurrentUser: (jwtToken: string) => Promise<void>;
  signUp: (user: IUser) => Promise<void>;
}

export const INITIAL_STATE: IAuthStateContext = {
  isPending: false,
  isSuccess: false,
  isError: false,
};

export const AuthStateContext = createContext<IAuthStateContext>(INITIAL_STATE);

export const AuthActionContext = createContext<IAuthActionContext>(undefined);
