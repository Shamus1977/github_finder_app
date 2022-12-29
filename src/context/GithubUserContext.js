import { createContext, useReducer } from "react";
import GithubReducer from "./github/GithubReducer";

const GithubUserContext = createContext();

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

export const GithubProvider = ({children}) => {
    const initialState = {
        users: [],
        user: {},
        isLoading: false,
    }

    const [state, dispatch] = useReducer(GithubReducer, initialState);

    const setLoading = () => {
        dispatch({
            type:"SET_LODING",
        })
    }

    //Search Users
    const searchUsers = async (text) => {
        setLoading();
        const params = new URLSearchParams({
            q:text,
        });

        const response = await fetch(`${GITHUB_URL}/search/users?${params}`,{
            headers:{
                Authorization: `token ${GITHUB_TOKEN}`,
            }
        });

        // From the opbject returned, destructure to get the items array.
        const {items} = await response.json()
        dispatch({
            type:"GET_USERS",
            payload: items,
        });
    }    
    //Get a Single User
    const getUser = async (login) => {
        setLoading();

        const response = await fetch(`${GITHUB_URL}/users/${login}`,{
            headers:{
                Authorization: `token ${GITHUB_TOKEN}`,
            }
        });

        if(response.status === 404){
            window.location="/notfound";
        }else{
            // From the opbject returned, destructure to get the items array.
            const data = await response.json()
            dispatch({
                type:"GET_USER",                                   
                payload: data,
            });
        }
    }



    const clearUsers = () => {
        dispatch({
            type:"CLEAR_USERS",
        });
    }

    return (
            <GithubUserContext.Provider
                value={{
                    users: state.users,
                    user: state.user,
                    isLoading: state.isLoading,
                    searchUsers,
                    clearUsers,
                    getUser,
                }}
            >
                {children}
            </GithubUserContext.Provider>)
}

export default GithubUserContext;