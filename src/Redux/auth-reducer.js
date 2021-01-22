import {authAPI, securityAPI} from "../api/api";

const SET_USER_DATA = "auth/SET_USER_DATA";
const SET_AUTH_ERROR = "auth/SET_AUTH_ERROR";
const GET_CAPTCHA_URL = "auth/GET_CAPTCHA_URL";

let initialState = {
    userId: null,
    email: null,
    login: null,
    isAuth: false,
    authError: null,
    captchaUrl: null
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

        case GET_CAPTCHA_URL:
            return {
                ...state,
                captchaUrl: action.payload
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
export const setCaptchaUrl = (captchaUrl) => ({type: GET_CAPTCHA_URL, payload: captchaUrl})

export const getAuthData = () => async (dispatch) => {
    const response = await authAPI.getAuthData()

    if (response.data.resultCode === 0) {
        let {id, email, login} = response.data.data;
        dispatch(setAuthUserData(id, email, login, true));
    }
}

export const login = (email, password, rememberMe, captcha) => async (dispatch) => {
    const response = await authAPI.login(email, password, rememberMe, captcha)

    if (response.data.resultCode === 0) {
        dispatch(getAuthData())
    } else if (response.data.resultCode === 10) {
        dispatch(setAuthError('Are you human?'))
        dispatch(getCaptchaUrl())
    } else { dispatch(setAuthError(response.data.messages[0])) }
}

export const logout = () => async (dispatch) => {
    const response = await authAPI.logout()

    response.data.resultCode === 0
        ? dispatch(setAuthUserData(null, null, null, false))
        : dispatch(setAuthError(response.data.messages[0]))
}

export const getCaptchaUrl = () => async (dispatch) => {
    const response = await securityAPI.getCaptchaUrl()
    const captchaUrl = response.data.url
    dispatch(setCaptchaUrl(captchaUrl))
}

export default authReducer;