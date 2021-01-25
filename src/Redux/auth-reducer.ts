import {authAPI, securityAPI} from "../api/api"

const SET_USER_DATA = "AUTH/SET_USER_DATA"
const SET_AUTH_ERROR = "AUTH/SET_AUTH_ERROR"
const GET_CAPTCHA_URL = "AUTH/GET_CAPTCHA_URL"

let initialState = {
    userId: null as number | null,
    email: null as string | null,
    login: null as string | null,
    isAuth: false,
    authError: null as string | null,
    captchaUrl: null as string | null
}

type InitialStateType = typeof initialState

const authReducer = (state = initialState, action: any): InitialStateType => {
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
            return state
    }
};

type SetAuthUserDataActionPayloadType = {
    userId: number | null
    email: string | null
    login: string | null
    isAuth: boolean
}

type SetAuthUserDataActionType = {
    type: typeof SET_USER_DATA
    payload: SetAuthUserDataActionPayloadType
}

export const setAuthUserData = (userId: number | null, email: string | null, login: string | null, isAuth: boolean): SetAuthUserDataActionType => ({
    type: SET_USER_DATA,
    payload: {userId, email, login, isAuth}
})

type SetAuthErrorActionType = {
    type: typeof SET_AUTH_ERROR
    payload: string
}
export const setAuthError = (error: string): SetAuthErrorActionType => ({ type: SET_AUTH_ERROR, payload: error })

type SetCaptchaUrlActionType = {
    type: typeof GET_CAPTCHA_URL
    payload: { captchaUrl: string }
}
export const setCaptchaUrl = (captchaUrl: string): SetCaptchaUrlActionType => ({ type: GET_CAPTCHA_URL, payload: {captchaUrl} })

export const getAuthData = () => async (dispatch: any) => {
    const response = await authAPI.getAuthData()
    if (response.data.resultCode === 0) {
        let {id, email, login} = response.data.data
        dispatch(setAuthUserData(id, email, login, true))
    }
}

export const login = (email: string, password: string, rememberMe: boolean, captcha: any) => async (dispatch: any) => {
    const response = await authAPI.login(email, password, rememberMe, captcha)
    if (response.data.resultCode === 0) {
        dispatch(getAuthData())
    } else if (response.data.resultCode === 10) {
        dispatch(setAuthError('Are you human?'))
        dispatch(getCaptchaUrl())
    } else { dispatch(setAuthError(response.data.messages[0])) }
}

export const logout = () => async (dispatch: any) => {
    const response = await authAPI.logout()
    response.data.resultCode === 0
        ? dispatch(setAuthUserData(null, null, null, false))
        : dispatch(setAuthError(response.data.messages[0]))
}

export const getCaptchaUrl = () => async (dispatch: any) => {
    const response = await securityAPI.getCaptchaUrl()
    const captchaUrl = response.data.url
    dispatch(setCaptchaUrl(captchaUrl))
}

export default authReducer