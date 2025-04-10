import { createContext } from "react";

export interface IUser {
  id: string;
  username: string;
  name: string;
  surname: string;
  emailAddress: string;
  password: string;
  roles: IUserRole[];
}

export interface ILoginData {
  email: string;
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
  loginUser: (loginData: ILoginData) => void;
  getCurrentUser: (jwtToken: string) => void;
}

export const INITIAL_STATE: IAuthStateContext = {
  isPending: false,
  isSuccess: false,
  isError: false,
};

export const AuthStateContext = createContext<IAuthStateContext>(INITIAL_STATE);

export const AuthActionContext = createContext<IAuthActionContext>(undefined);
