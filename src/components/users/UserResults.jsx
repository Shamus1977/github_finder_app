import React, {useEffect, useState} from 'react';
import SpinGif from '../layout/SpinGif';
import UserItem from './UserItem';

const UserResults = () => {
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        fetchUsers();
    },[]);

    const fetchUsers = async () => {
        const response = await fetch(process.env.REACT_APP_GITHUB_URL+"/users",{
            headers:{
                Authorization:`token ${process.env.REACT_APP_GITHUB_TOKEN}`
            }
        });
        const data = await response.json();
        setUsers(data);
        setIsLoading(false);
    }
    if(!isLoading){
        return (
            <div className='grid grid-cols-1 ga-8 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2'>
                {users.map((user) => {
                    return <UserItem key={user.id} user={user} />
                })}
            </div>
        )
    }else{
        return <div><SpinGif /></div>
    }

}

export default UserResults
