import { useCollection } from '../hooks/useCollection'
import Avatar from '../components/Avatar'

//styles
import './OnlineUsers.css'

import React, { useReducer } from 'react';

const OnlineUsers = () => {
    const { error, documents } = useCollection('users')
    return (
        <div className='user-list'>
            <h2>All Users</h2>
            {error && <div className='error'>{error}</div>}
            {documents && documents.map(user => (
                <div key={user.id} className="user-list-item">
                   {user.online &&  <span className="online-user"></span>} 
                    <span>{user.displayName}</span>
                    <Avatar source={user.photoURL}/>
                </div>
            ))} 
        </div>
    );
}

export default OnlineUsers;
