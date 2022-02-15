import React from 'react'
import { Divider } from 'antd';
import PageChanger from './PageChanger';
import PageDetails from './PageDetails';
import SearchBar from './SearchBar';
import './scss/Header.css';

const Header = ({users, page, changeSelectedID, changePage}) => {

    const HeaderTitle = ({page}) => {
        return (
            <div className='centered'>

                <h2 className='headerTitle'> Page {page}</h2>
            </div>
        )
    }
 
    return(
        <div className='headerBackground'>
            <div className='usersHeader'>
                <HeaderTitle 
                    page={page}
                />
                <PageChanger 
                    page={page}
                    changePage={changePage}
                />
                <Divider orientation="left"> Shortcut </Divider>
                <PageDetails 
                    users={users}
                />
                <Divider orientation="left"> Search Bar </Divider>
                <SearchBar 
                    placeholder='enter a name' 
                    users={users}
                    changeSelectedID={changeSelectedID}
                />
            </div>
        </div>
    )

}

export default Header;