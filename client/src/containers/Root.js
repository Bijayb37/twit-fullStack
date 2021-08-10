import React from 'react'
import { Provider } from 'react-redux'
import { configureStore } from '../store'
import { setAuthorizationToken, setCurrentUser } from '../store/actions/auth';
import jwtDecode from 'jwt-decode';

const Root = ({ children }) => {
    const store = configureStore()
    //checks localstorage if there is a key then user is logged in
    if (localStorage.jwtToken) {
        setAuthorizationToken(localStorage.jwtToken)
        //prevent manual tampering with ky of jwtToken
        try {
            store.dispatch(setCurrentUser(jwtDecode(localStorage.jwtToken)))
        } catch (e) {
            store.dispatch(setCurrentUser({}))
        }
    }
    return (
        <Provider store={store}>
            {children}
        </Provider>
    )
}

export default Root