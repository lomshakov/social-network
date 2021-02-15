import { createSelector } from 'reselect'
import { AppStateType } from './redux-store'

export const getIsAuth = (state: AppStateType) => {
    return state.auth.isAuth
}

export const getAuthError = (state: AppStateType) => {
    return state.auth.authError
}

export const getCaptchaUrl = (state: AppStateType) => {
    return state.auth.captchaUrl
}

export const getLoginSelector = (state: AppStateType) => {
    return state.auth.login
}

export const getUserIdSelector = (state: AppStateType) => {
    return state.auth.userId
}