"use client";

import { createContext } from "react";

export interface IEmail {
  to: string;
  subject: string;
  body: string;
}

export interface IEmailStateContext {
  isPending: boolean;
  isSuccess: boolean;
  isError: boolean;
}

export interface IEmailActionContext {
  sendEmail: (email: IEmail) => Promise<void>;
}

export const INITIAL_STATE: IEmailStateContext = {
  isPending: false,
  isSuccess: false,
  isError: false,
};

export const AuthStateContext = createContext<IEmailStateContext>(INITIAL_STATE);

export const AuthActionContext = createContext<IEmailActionContext>(undefined);
