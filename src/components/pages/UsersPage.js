import React, { useEffect, useReducer} from 'react';
import axios from 'axios';
import { Spin, message} from 'antd';
import Hero from '../Hero';
import Header from '../Header';
import UsersContainer from '../UsersContainer';
import FixedItems from '../FixedItems';
import Footer from '../Footer';
import { reducer } from '../../reducers/reducer';
import './Pages.css';

const UsersPage = () => {

    const defaultState = {
        isLoading: true,
        isError: false,
        users: [],
        selectedUsersID: [],
        displayMode: 'normalListing',
        request: {
            seed: 'abc',
            results: 15, // 150.000 users
            page: 1
        },
    }
    const [state, dispatch] = useReducer(reducer, defaultState);
    
    const fetchData = () => {
        const url = 'https://randomuser.me/api/?' + 
            'seed=' + state.request.seed + 
            '&results=' + state.request.results + 
            '&page=' + state.request.page;
        axios.get(url)
        .then(result => {
            const { results } = result.data;
            results.forEach((el, i) => {
                el['myID'] = 'user_id_' + i;
            })
            dispatch({ type: 'SET_USERS', payload: results }); 
            message.config({ duration: 2, maxCount: 1}); 
            message.success('Data Fetching Completed');
        })
        .catch(error => {
            dispatch({ type: 'ERROR'});
            message.error('No Fetch Completed');
            console.log(error);
        })
    };


    useEffect(() => {
        fetchData();
    }, [state.request]);


    const removeUser = (userID) => {
        dispatch({ type: 'REMOVE_USER', payload: userID});
        message.config({
            duration: 0.75,
            maxCount: 3,
          });
        message.info('user deleted');
    }
    const changePage = (page) => {
        dispatch({ type: 'CHANGE_REQUEST_PAGE', payload: page });
    }
    const changeSelectedID = (newSelectedIDs) => {
        dispatch({ type: 'SET_SELECTED_USERS_ID', payload: newSelectedIDs })
    }
    const changeDisplayMode = (displayMode) => {
        console.log('ciao')
        dispatch({ type: 'CHANGE_DISPLAY_MODE', payload: displayMode })
    }



    return (
        <div className='usersPage'>
            {state.isError ? <h1>ERROR RETREIVING DATA</h1> : 
                // NO ERROR => USERS SECTION
                <React.Fragment>
                    <Hero />
                    <Header
                        page={state.request.page}
                        users={state.users}
                        changeSelectedID={changeSelectedID}
                        changePage={changePage}
                    />
                    {
                        state.isLoading ? 
                            <div className='pageLoading'>  
                                <Spin size='large'/> 
                                &nbsp; I am loading... 
                            </div> 
                        :
                            <UsersContainer
                                users={state.users.filter((user) => state.selectedUsersID.includes(user.myID))} 
                                removeUser={removeUser}
                                displayMode={state.displayMode}
                            />
                    }
                    <Footer page={state.request.page}
                        changePage={changePage}/>      
                    <FixedItems 
                        page={state.request.page}
                        changePage={changePage}
                        displayMode={state.displayMode}
                        changeDisplayMode={changeDisplayMode}
                    />
                </React.Fragment>
                
            }
            
        </div>
    )
}

export default UsersPage;