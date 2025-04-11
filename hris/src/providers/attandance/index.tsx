import { getAxiosInstace } from "../../utils/axios-instance"
import { INITIAL_STATE, IAttandance, AttandanceActionContext, AttandanceStateContext } from "./context";
import { AttandanceReducer } from "./reducer";
import { useContext, useReducer } from "react";
import { getAttandancesError, getAttandancesPending, getAttandancesSuccess, getAttandanceError, getAttandancePending, getAttandanceSuccess, createAttandancePending, createAttandanceError, updateAttandanceSuccess, createAttandanceSuccess, updateAttandancePending, updateAttandanceError, deleteAttandancePending, deleteAttandanceSuccess, deleteAttandanceError} from "./actions";
import axios from "axios";

 export const AttandanceProvider = ({children}: {children: React.ReactNode}) => {
    const [state, dispatch] = useReducer(AttandanceReducer, INITIAL_STATE);
    const instance = getAxiosInstace();

    const getAttandances = async() => {
        dispatch(getAttandancesPending());
        const endpoint =    `https://fakestoreapi.com/Attandances`;
        await axios(endpoint)
        .then((response) => {
            dispatch(getAttandancesSuccess(response.data));
        })
        .catch((error) => {
            console.error(error);
            dispatch(getAttandancesError());
        });
    };

    const getAttandance = async(id: string) => {
        dispatch(getAttandancePending());
        const endpoint = `/Attandances/${id}`;
        await instance.get(endpoint)
        .then((response) => {
            dispatch(getAttandanceSuccess(response.data));
        })
        .catch((error) => {
            console.error(error);
            dispatch(getAttandanceError());
        });
    }       

    const createAttandance = async(Attandance: IAttandance) => {
        dispatch(createAttandancePending());
        const endpoint = `/Attandances`;
        await instance.post(endpoint, Attandance)
        .then((response) => {
            dispatch(createAttandanceSuccess(response.data));
        })
        .catch((error) => {
            console.error(error);
            dispatch(createAttandanceError());
        });
    }

    const updateAttandance = async( Attandance: IAttandance) => {
        dispatch(updateAttandancePending());
        const endpoint = `/Attandances/${Attandance.id}`;
        await instance.put(endpoint, Attandance)
        .then((response) => {
            dispatch(updateAttandanceSuccess(response.data));
        })
        .catch((error) => {
            console.error(error);
            dispatch(updateAttandanceError());
        });
    }

    const deleteAttandance = async(id: string) => {
        dispatch(deleteAttandancePending());
        const endpoint = `https://fakestoreapi.com/Attandances/${id}`;
        await instance.delete(endpoint)
        .then((response) => {   
            dispatch(deleteAttandanceSuccess(response.data));
        })
        .catch((error) => {
            console.error(error);
            dispatch(deleteAttandanceError());
        });
    }

    return(
        <AttandanceStateContext.Provider value={state}>
            <AttandanceActionContext.Provider value={{getAttandances, getAttandance, createAttandance, updateAttandance, deleteAttandance}}>
                {children}
            </AttandanceActionContext.Provider>
        </AttandanceStateContext.Provider>
    )
   
};

export const useAttandanceState = () => {
    const context = useContext(AttandanceStateContext);
    if (!context) {
        throw new Error('useAttandanceState must be used within a AttandanceProvider');
    }
    return context;
}

export const useAttandanceActions = () => {
    const context = useContext(AttandanceActionContext);
    if (!context) {
        throw new Error('useAttandanceActions must be used within a AttandanceProvider');
    }    return context;
}

