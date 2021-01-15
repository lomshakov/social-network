import {authAPI} from "../api/api";

const SET_USER_DATA = "auth/SET_USER_DATA";
const SET_AUTH_ERROR = "auth/SET_AUTH_ERROR";

let initialState = {
    userId: null,
    email: null,
    login: null,
    isAuth: false,
    authError: null
};

const authReducer = (state = initialState, action) => {

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

export const setAuthUserData = (userId, email, login, isAuth) => ({
    type: SET_USER_DATA,
    payload: {userId, email, login, isAuth}
});
export const setAuthError = (error) => ({type: SET_AUTH_ERROR, payload: error})

export const getAuthData = () => async (dispatch) => {
    let response = await authAPI.getAuthData()

    if (response.data.resultCode === 0) {
        let {id, email, login} = response.data.data;
        dispatch(setAuthUserData(id, email, login, true));
    }
}

export const login = (email, password, rememberMe) => async (dispatch) => {
    let response = await authAPI.login(email, password, rememberMe)

    response.data.resultCode === 0
        ? dispatch(getAuthData())
        : dispatch(setAuthError(response.data.messages[0]))
}

export const logout = () => async (dispatch) => {
    let response = await authAPI.logout()

    response.data.resultCode === 0
        ? dispatch(setAuthUserData(null, null, null, false))
        : dispatch(setAuthError(response.data.messages[0]))
}

export default authReducer;