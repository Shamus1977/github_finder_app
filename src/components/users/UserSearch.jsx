import React, {useState, useContext} from 'react';
import GithubUserContext from '../../context/GithubUserContext';
import AlertContext from '../../context/alert/AlertContext';
import {searchUsers} from "../../context/github/GithubActions";
const UserSearch = () => {
    const [text, setText] = useState("");

    const {users,dispatch} = useContext(GithubUserContext);

    const {setAlert} = useContext(AlertContext);

    const handleChange = (event) => {
        let changedText = event.target.value;
        setText(changedText);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        if(text === ""){
            setAlert("Please Enter A Search Term", "error");
        }else{
            const users = await searchUsers(text);
            dispatch({
                type: "SET_LOADING"
            });
            dispatch({
                type:"GET_USERS",
                payload: users,
            })
            setText("");
        }
    }

    const handleClearUsers = () => {
        dispatch({
            type:"CLEAR_USERS",
        });
    }

    return (
        <div className='grid grid-cols-1 xl:grid-cols-2 lg:grid-cols-2 md:grid:cols-2 mb-8 gap-8'>
            <form onSubmit={handleSubmit}>
                <div className='form-control'>
                    <div className='relative' >
                        <input 
                            type="text" 
                            className='w-full pr-40 bg-gray-200 input input-lg text-black' 
                            placeholder='Search'
                            value={text}
                            onChange={handleChange}
                        />
                        <button 
                            type="submit"
                            className='absolute top-0 right-0 rounded-l-none w-36 btn btn-lg' 
                        >
                            GO
                        </button>
                    </div>
                </div>
            </form>
            {users.length > 0 && (
                <div>
                <button 
                    onClick={handleClearUsers}
                    className='btn btn-ghost btn-lg'
                >
                    Clear
                </button>
            </div>
            )}

        </div>
    )
}

export default UserSearch
