import React, {useEffect, useContext} from 'react';
import GithubUserContext from '../context/GithubUserContext';
import { useParams } from 'react-router-dom';

const User = () => {
    const {user, getUser} = useContext(GithubUserContext);

    const params = useParams();

    useEffect(() => {
        getUser(params.login);
    });
    
    return (
        <div>
            {user.login}
        </div>
    )
}

export default User
