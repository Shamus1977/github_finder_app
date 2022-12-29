import { createContext, useReducer } from "react";
import GithubReducer from "./github/GithubReducer";

const GithubUserContext = createContext();

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

export const GithubProvider = ({children}) => {
    const initialState = {
        users: [],
        loading: true,
    }

    const [state, dispatch] = useReducer(GithubReducer, initialState);

    const fetchUsers = async () => {
        const response = await fetch(`${GITHUB_URL}/users`,{
            headers:{
                Authorization: `token ${GITHUB_TOKEN}`,
            }
        });
        const data = await response.json()
        dispatch({
            type:"GET_USERS",
            payload: data,
        });
    }
    return (
            <GithubUserContext.Provider
                value={{
                    users: state.users,
                    isLoading: state.isLoading,
                    fetchUsers
                }}
            >
                {children}
            </GithubUserContext.Provider>)
}

export default GithubUserContext;