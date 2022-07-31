//styles

import './Avatar.css'

import React from 'react';

const Avatar = ({ source }) => {
    return (
        <div className='avatar'>
            <img src={source} alt="user avatar" />
        </div>
    );
}

export default Avatar;
