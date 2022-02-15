import React from 'react';
import {  Statistic } from 'antd';

const PageDetails = ({users}) => {

    const getHowManyUsers = (users) => {return users.length}
    const getHowManyUsersByGender = (users, gender) => {
        return users.filter((user) => user.gender === gender).length
    }
    const getHowManyUsersByNat = (users, nat) => {
        return users.filter((user) => user.nat === nat).length 
    }
    
    const totUsers = getHowManyUsers(users);
    const totMales = getHowManyUsersByGender(users, 'male');
    const totFemales = getHowManyUsersByGender(users, 'female');
    const totSwiss = getHowManyUsersByNat(users, 'CH');

    return (
        <div className='headerDetails'>
            <div className='headerStatistics flex-row space-evenly wrap'>
                <div className='userStatistic centered'>
                    <Statistic  title="Users" value={totUsers}/>
                </div>
                <div className='userStatistic centered'>
                    <Statistic title="Male" value={totMales} suffix={'/ ' + totUsers} />
                </div>
                <div className='userStatistic centered'>
                    <Statistic title="Female" value={totFemales} suffix={'/ ' + totUsers} />
                </div>
                <div className='userStatistic centered'>
                    <Statistic title="Swiss" value={totSwiss} suffix={'/ ' + totUsers} />
                </div>
            </div>

        </div>
    )

}

export default PageDetails;