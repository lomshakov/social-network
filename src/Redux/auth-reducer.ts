import {ResultCode} from '../api/api'
import {authAPI} from '../api/auth-api'
import {securityAPI} from '../api/security-api'
import {BaseThunkType, InferActionsType} from './redux-store'
import {ValuesLoginType} from '../Components/Login/LoginForm'

// initial state
let initialState = {
    userId: null as number | null,
    email: null as string | null,
    login: null as string | null,
    isAuth: false,
    authError: null as string | null,
    captchaUrl: null as string | null
}

// reducer
const authReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case 'AUTH/SET_USER_DATA':
            return {
                ...state,
                ...action.payload
            }
        case 'AUTH/SET_AUTH_ERROR':
            return {
                ...state,
                authError: action.payload
            }
        case 'AUTH/GET_CAPTCHA_URL':
            return {
                ...state,
                captchaUrl: action.payload
            }
        default:
            return state
    }
}

type InitialStateType = typeof initialState
type ActionsTypes = InferActionsType<typeof actions>

// actions
const actions = {
    setAuthUserData: (userId: number | null, email: string | null, login: string | null, isAuth: boolean) => ({
        type: 'AUTH/SET_USER_DATA',
        payload: {userId, email, login, isAuth}
    } as const),
    setAuthError: (error: string) => ({ type: 'AUTH/SET_AUTH_ERROR', payload: error } as const),
    setCaptchaUrl: (captchaUrl: string) => ({ type: 'AUTH/GET_CAPTCHA_URL', payload: captchaUrl } as const)
}

type ThunkType = BaseThunkType<ActionsTypes>

// thunks-creators
export const getAuthData = (): ThunkType => async (dispatch) => {
    const data = await authAPI.getAuthData()

    if (data.resultCode === ResultCode.Success) {
        let {id, email, login} = data.data
        dispatch(actions.setAuthUserData(id, email, login, true))
    }
}

export const login = (values: ValuesLoginType): ThunkType => async (dispatch: any) => {
    const {email, password, rememberMe, captcha} = values
    const data = await authAPI.login(email, password, rememberMe, captcha)
    if (data.resultCode === ResultCode.Success) {
        dispatch(getAuthData())
    } else if (data.resultCode === ResultCode.CaptchaIsRequried) {
        dispatch(actions.setAuthError('Are you human?'))
        dispatch(getCaptchaUrl())
    } else { dispatch(actions.setAuthError(data.messages[0])) }
}

export const logout = (): ThunkType => async (dispatch) => {
    const data = await authAPI.logout()
    data.resultCode === ResultCode.Success
        ? dispatch(actions.setAuthUserData(null, null, null, false))
        : dispatch(actions.setAuthError(data.messages[0]))
}

export const getCaptchaUrl = (): ThunkType => async (dispatch) => {
    const data = await securityAPI.getCaptchaUrl()
    dispatch(actions.setCaptchaUrl(data.url))
}

export default authReducer