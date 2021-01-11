import {authAPI} from "../api/api";

const SET_USER_DATA = 'SET_USER_DATA';
const SET_AUTH_ERROR = "SET_AUTH_ERROR";

let initialState = {
    userId: null,
    email: null,
    login: null,
    isAuth: false,
    authError: null
};

const authReducer = (state= initialState, action) => {

    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.payload
            }

        case SET_AUTH_ERROR:
            return {
                ...state,
                authError: action.payload
            }

        default:
            return state;
    }
};

export const setAuthUserData = (userId, email, login, isAuth) => ({type: SET_USER_DATA, payload: {userId, email, login, isAuth}});
export const setAuthError = (error) => ({type: SET_AUTH_ERROR, payload: error})

export const setAuth = () => (dispatch) => {
        return authAPI.getAuthData()
            .then(response => {
                if (response.data.resultCode === 0) {
                    let {id, email, login} = response.data.data; // здесь должно быть как в API - id а не userId
                    dispatch(setAuthUserData(id, email, login, true));
                }
            });
}

export const login = (email, password, rememberMe) => {
    return (dispatch) => {
        authAPI.login(email, password, rememberMe)
            .then(response => {
                (response.data.resultCode === 0)
                    ? dispatch(setAuth())
                    : dispatch(setAuthError(response.data.messages[0]))
            });
    }
}

export const logout = () => {
    return (dispatch) => {
        authAPI.logout()
            .then(response => {
                if (response.data.resultCode === 0) {
                    dispatch(setAuthUserData(null, null, null, false))
                }
            });
    }
}

export default authReducer;