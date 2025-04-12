'use client'
import { getAxiosInstace } from "../../utils/axios-instance"
import { INITIAL_STATE, JobPostingActionContext, JobPostingStateContext } from "./context";
import { JobPostingReducer } from "./reducer";
import { useContext, useReducer } from "react";
import { getJobPostingsError, getJobPostingsPending, getJobPostingsSuccess, getJobPostingError, getJobPostingPending, getJobPostingSuccess, createJobPostingPending, createJobPostingError, updateJobPostingSuccess, createJobPostingSuccess, updateJobPostingPending, updateJobPostingError, deleteJobPostingPending, deleteJobPostingSuccess, deleteJobPostingError} from "./actions";
import axios from "axios";

 export const JobPostingProvider = ({children}: {children: React.ReactNode}) => {
    const [state, dispatch] = useReducer(JobPostingReducer, INITIAL_STATE);
    const instance = getAxiosInstace();

    const getJobPostings = async() => {
        dispatch(getJobPostingsPending());
        const endpoint =    `/JobPosting/GetAll`;
        await axios(endpoint)
        .then((response) => {
            dispatch(getJobPostingsSuccess(response.data));
        })
        .catch((error) => {
            console.error(error);
            dispatch(getJobPostingsError());
        });
    };

    const getJobPosting = async(id: string) => {
        dispatch(getJobPostingPending());
        const endpoint = `/JobPosting/Get/${id}`;
        await instance.get(endpoint)
        .then((response) => {
            dispatch(getJobPostingSuccess(response.data));
        })
        .catch((error) => {
            console.error(error);
            dispatch(getJobPostingError());
        });
    }       

    const createJobPosting = async(JobPosting: IJobPosting) => {
        dispatch(createJobPostingPending());
        const endpoint = `/JobPosting/Create`;
        await instance.post(endpoint, JobPosting)
        .then((response) => {
            dispatch(createJobPostingSuccess(response.data));
        })
        .catch((error) => {
            console.error(error);
            dispatch(createJobPostingError());
        });
    }

    const updateJobPosting = async( JobPosting: IJobPosting) => {
        dispatch(updateJobPostingPending());
        const endpoint = `/JobPosting/Update/${JobPosting.id}`;
        await instance.put(endpoint, JobPosting)
        .then((response) => {
            dispatch(updateJobPostingSuccess(response.data));
        })
        .catch((error) => {
            console.error(error);
            dispatch(updateJobPostingError());
        });
    }

    const deleteJobPosting = async(id: string) => {
        dispatch(deleteJobPostingPending());
        const endpoint = `/JobPostings/Delete/${id}`;
        await instance.delete(endpoint)
        .then((response) => {   
            dispatch(deleteJobPostingSuccess(response.data));
        })
        .catch((error) => {
            console.error(error);
            dispatch(deleteJobPostingError());
        });
    }

    return(
        <JobPostingStateContext.Provider value={state}>
            <JobPostingActionContext.Provider value={{getJobPostings, getJobPosting, createJobPosting, updateJobPosting, deleteJobPosting}}>
                {children}
            </JobPostingActionContext.Provider>
        </JobPostingStateContext.Provider>
    )
   
};

export const useJobPostingState = () => {
    const context = useContext(JobPostingStateContext);
    if (!context) {
        throw new Error('useJobPostingState must be used within a JobPostingProvider');
    }
    return context;
}

export const useJobPostingActions = () => {
    const context = useContext(JobPostingActionContext);
    if (!context) {
        throw new Error('useJobPostingActions must be used within a JobPostingProvider');
    }    return context;
}

