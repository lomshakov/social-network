import { createSelector } from 'reselect'
import { AppStateType } from './redux-store'

export const getProfileSelector = (state: AppStateType) => {
    return state.profilePage.profile
}

export const getStatusSelector = (state: AppStateType) => {
    return state.profilePage.status
}

export const getErrorSelector = (state: AppStateType) => {
    return state.profilePage.profileChangeError
}

export const getPostsSelector = (state: AppStateType) => {
    return state.profilePage.posts
}