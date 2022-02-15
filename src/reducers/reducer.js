export const reducer = (state, action) => {
    if (action.type === 'SET_USERS') {
      const newUsers = action.payload;
      const newSelectedUsersID = newUsers.map(user => user.myID);
      return {...state,
        users: newUsers,
        selectedUsersID: newSelectedUsersID,
        isLoading: false
      }
    }
    if (action.type === 'CHANGE_REQUEST_PAGE') {
      const newRequest = {...state.request, page: action.payload} 
      return {...state, 
        request: newRequest,
        isLoading: true,
        users: [],
        isError: false
      }
    }
    if (action.type === 'REMOVE_USER') {
      const filteredUsers = state.users.filter((user) => user.myID !== action.payload)
              return {...state, 
                users: filteredUsers
              }
    }
    if (action.type === 'SET_SELECTED_USERS_ID') {
      const newSelectedUsersID = [...action.payload]
              return {...state,
                selectedUsersID: newSelectedUsersID,
              }
    }
    if (action.type === 'CHANGE_DISPLAY_MODE') {
      const newDisplayMode = action.payload
              return {...state,
                displayMode: newDisplayMode,
              }
    }
    if (action.type === 'ERROR') {
              return {...state,
                isError: true,
                isLoading: false
              }
    }
    throw new Error('no matching action type');
  };