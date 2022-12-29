import React, {useState, useContext} from 'react';
import GithubUserContext from '../../context/GithubUserContext';

const UserSearch = () => {
    const [text, setText] = useState("");

    const {users, searchUsers} = useContext(GithubUserContext);

    const handleChange = (event) => {
        let changedText = event.target.value;
        setText(changedText);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if(text === ""){
            alert("Please Enter A Search Term.")
        }else{
            searchUsers(text);
            setText("");
        }
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
                <button className='btn btn-ghost btn-lg'>
                    Clear
                </button>
            </div>
            )}

        </div>
    )
}

export default UserSearch
