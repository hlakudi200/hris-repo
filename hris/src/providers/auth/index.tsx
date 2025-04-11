"use client";

import { useContext, useReducer } from "react";
import { AuthReducer } from "./reducer";
import {
  AuthActionContext,
  AuthStateContext,
  ILoginData,
  INITIAL_STATE,
  IUser,
} from "./context";
import {
  getCurrentUserError,
  getCurrentUserPending,
  getCurrentUserSuccess,
  loginUserError,
  loginUserPending,
  loginUserSuccess,
  signUpError,
  signUpPending,
  signUpSuccess,
} from "./actions";
import { getAxiosInstace } from "@/utils/axios-instance";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);
  const instance = getAxiosInstace();

  const loginUser = async (loginData: ILoginData) => {
    dispatch(loginUserPending());

    const endpoint: string = `/api/TokenAuth/Authenticate`;

    await instance
      .post(endpoint, loginData)
      .then((response) => {
        getCurrentUser(response.data.result.accessToken);
        dispatch(loginUserSuccess(response.data.result.accessToken));
      })
      .catch((error) => {
        console.error(error);
        dispatch(loginUserError());
      });
  };

  const getCurrentUser = async (jwtToken: string) => {
    dispatch(getCurrentUserPending());
    const endpoint = `/api/services/app/Session/GetCurrentLoginInformations`;
    await instance
      .get(endpoint, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      })
      .then((response) => {
        debugger;
        if (response.status === 200 && response.data) {
          const currentUser: IUser = response.data.result.user;
          dispatch(getCurrentUserSuccess(currentUser));
        }
      })
      .catch((error) => {
        console.error(error);
        dispatch(getCurrentUserError());
      });
  };

  const signUp = async (user: IUser) => {
    dispatch(signUpPending());
    const endpoint = `/api/services/app/User/Create`;

    await instance
      .post(endpoint, user)
      .then((response) => {
        if (response.status === 201) {
          dispatch(signUpSuccess());
        }
      })
      .catch((error) => {
        console.error(error);
        dispatch(signUpError());
      });
  };

  return (
    <AuthStateContext.Provider value={state}>
      <AuthActionContext.Provider value={{ loginUser, getCurrentUser, signUp }}>
        {children}
      </AuthActionContext.Provider>
    </AuthStateContext.Provider>
  );
};

export const useAuthState = () => {
  const context = useContext(AuthStateContext);
  if (!context) {
    throw new Error("useAuthState must be used within a AuthProvider");
  }
  return context;
};

export const useAuthActions = () => {
  const context = useContext(AuthActionContext);
  if (!context) {
    throw new Error("useAuthActions must be used within a AuthProvider");
  }
  return context;
};
