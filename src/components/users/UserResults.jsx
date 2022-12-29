import React, {useContext} from 'react';
import GithubUserContext from '../../context/GithubUserContext';
import SpinGif from '../layout/SpinGif';
import UserItem from './UserItem';

const UserResults = () => {

    const {isLoading, users} = useContext(GithubUserContext);

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
