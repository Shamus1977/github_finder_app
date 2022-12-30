
import { createContext, useReducer } from "react";
import GithubReducer from "./github/GithubReducer";

const GithubUserContext = createContext();

export const GithubProvider = ({children}) => {
    const initialState = {
        users: [],
        user: {},
        repos: [],
        isLoading: false,
    }

    const [state, dispatch] = useReducer(GithubReducer, initialState);

    return (
            <GithubUserContext.Provider
                value={{
                    ...state,
                    dispatch,
                }}
            >
                {children}
            </GithubUserContext.Provider>)
}

export default GithubUserContext;