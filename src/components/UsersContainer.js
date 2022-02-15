import React from 'react';
import UserCard from './UserCard'
import './scss/UsersContainer.css';

const UsersContainer = ({users, removeUser, displayMode}) => {

    return (
        
        <div className={'usersContainer ' + displayMode}>
            {users.map((user, i) => {
                return(
                    <UserCard 
                        info={user} 
                        removeUser={removeUser}
                        key={user.myID}
                        displayMode={displayMode}
                    />
                )
            })}
        </div>
    )
}

export default UsersContainer;