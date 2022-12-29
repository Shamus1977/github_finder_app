import React from 'react';
import PropTypes from "prop-types";
import {Link} from "react-router-dom";

const UserItem = ({user:{login, avatar_url}}) => {
    return (
        <div className='card shadow-md compact side bg-base-100 m-5'>
            <div className='flex-row items-center space-x-4 card-body' >
                <div>
                    <div className='avatar' >
                        <div className='rounded-full shadow w-14 h-14' >
                            <img alt="avatar of user" src={avatar_url} />
                        </div>
                    </div>
                </div>
                <div>
                    <h2 className='card-title' >{login}</h2>
                    <Link to={`/users/${login}`} className="text-base-content text-opacity-40" >
                        Visit Profile
                    </Link>
                </div>
            </div>
        </div>
    );
}

UserItem.prototypes = {
    user:PropTypes.object.isRequired
}

export default UserItem
