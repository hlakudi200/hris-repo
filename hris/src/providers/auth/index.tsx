import { useContext, useReducer } from "react";
import { AuthReducer } from "./reducer";
import { AuthActionContext, AuthStateContext, ILoginData, INITIAL_STATE, IUser } from "./context";
import {
  getCurrentUserError,
  getCurrentUserPending,
  getCurrentUserSuccess,
  loginUserError,
  loginUserPending,
  loginUserSuccess,
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
        getCurrentUser(response.data);
        dispatch(loginUserSuccess(response.data));
      })
      .catch((error) => {
        console.error(error);
        dispatch(loginUserError());
      });
  };

  const getCurrentUser = async (jwtToken: string) => {
    dispatch(getCurrentUserPending());
    const endpoint = `/api/services/app/User/Get`;

    await instance
      .get(endpoint, {
        headers: {
          Authorization: jwtToken,
        },
      })
      .then((response) => {
        if (response.status === 200 && response.data) {
          const currentUser: IUser = response.data;
          dispatch(getCurrentUserSuccess(currentUser));
        }
      })
      .catch((error) => {
        console.log(error);
        dispatch(getCurrentUserError());
      });
  };

  return (
    <AuthStateContext.Provider value={state}>
        <AuthActionContext.Provider value={{loginUser, getCurrentUser}}>
            {children}
        </AuthActionContext.Provider>
    </AuthStateContext.Provider>
  )
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
  
