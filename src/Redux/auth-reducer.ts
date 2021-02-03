import { authAPI, securityAPI, ResultCode } from '../api/api'
import { AppStateType } from './redux-store'
import { ThunkAction } from 'redux-thunk'
import { Dispatch } from 'redux'
import {ValuesLoginType} from '../Components/Login/LoginForm'

// string types
const SET_USER_DATA = 'AUTH/SET_USER_DATA'
const SET_AUTH_ERROR = 'AUTH/SET_AUTH_ERROR'
const GET_CAPTCHA_URL = 'AUTH/GET_CAPTCHA_URL'

// initial state
let initialState = {
    userId: null as number | null,
    email: null as string | null,
    login: null as string | null,
    isAuth: false,
    authError: null as string | null,
    captchaUrl: null as string | null
}

type InitialStateType = typeof initialState

// reducer
const authReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
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

// definition types for Action creators
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
type SetAuthErrorActionType = {
    type: typeof SET_AUTH_ERROR
    payload: string
}
type SetCaptchaUrlActionType = {
    type: typeof GET_CAPTCHA_URL
    payload: string
}

// main actions type
type ActionsTypes = SetAuthUserDataActionType | SetAuthErrorActionType | SetCaptchaUrlActionType

// action-creators
export const setAuthUserData = (userId: number | null, email: string | null, login: string | null, isAuth: boolean): SetAuthUserDataActionType => ({
    type: SET_USER_DATA,
    payload: {userId, email, login, isAuth}
})
export const setAuthError = (error: string): SetAuthErrorActionType => ({ type: SET_AUTH_ERROR, payload: error })
export const setCaptchaUrl = (captchaUrl: string): SetCaptchaUrlActionType => ({ type: GET_CAPTCHA_URL, payload: captchaUrl })

// definition types for thunks-creators
type DispatchType = Dispatch<ActionsTypes>
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>

// thunks-creators
export const getAuthData = (): ThunkType => async (dispatch: DispatchType) => {
    const data = await authAPI.getAuthData()

    if (data.resultCode === ResultCode.Success) {
        let {id, email, login} = data.data
        dispatch(setAuthUserData(id, email, login, true))
    }
}

export const login = (values: ValuesLoginType): ThunkType => async (dispatch: any) => {
    const {email, password, rememberMe, captcha} = values
    const data = await authAPI.login(email, password, rememberMe, captcha)
    if (data.resultCode === ResultCode.Success) {
        dispatch(getAuthData())
    } else if (data.resultCode === ResultCode.CaptchaIsRequried) {
        dispatch(setAuthError('Are you human?'))
        dispatch(getCaptchaUrl())
    } else { dispatch(setAuthError(data.messages[0])) }
}

export const logout = (): ThunkType => async (dispatch: DispatchType) => {
    const data = await authAPI.logout()
    data.resultCode === ResultCode.Success
        ? dispatch(setAuthUserData(null, null, null, false))
        : dispatch(setAuthError(data.messages[0]))
}

export const getCaptchaUrl = (): ThunkType => async (dispatch: DispatchType) => {
    const data = await securityAPI.getCaptchaUrl()
    dispatch(setCaptchaUrl(data.url))
}

export default authReducer