import { Dispatch } from 'redux'
import {APIResponseType, ResultCode} from '../api/api'
import {usersAPI} from '../api/users-api'
import { updateObjectInArray } from '../utils/object-utils'
import { UsersType } from '../types/types'
import {AppStateType, BaseThunkType, InferActionsType} from './redux-store'

// initial state
let initialState = {
    users: [] as Array<UsersType>,
    pageSize: 10,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: [] as Array<number>, // array of user IDs
    filter: {
        term: '',
        friend: null as null | boolean
    }
}

// reducer
const usersReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {

        case 'USERS/FOLLOW':
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, "id", {followed: true})
            }
        case 'USERS/UNFOLLOW':
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, "id", {followed: false})
            }
        case 'USERS/SET_USERS':
            return {...state, users: action.users}
        case 'USERS/SET_CURRENT_PAGE':
            return {...state, currentPage: action.currentPage}
        case 'USERS/SET_TOTAL_USERS_COUNT':
            return {...state, totalUsersCount: action.totalUsersCount}
        case 'USERS/TOGGLE_IS_FETCHING':
            return {...state, isFetching: action.isFetching}
        case 'USERS/TOGGLE_IS_FOLLOWING_PROGRESS':
            return {
                ...state,
                followingInProgress: action.isFollow
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id !== action.userId)
            }
        case 'USERS/SET_PAGE_SIZE':
            return {
                ...state,
                pageSize: action.pageSize
            }
        case "USERS/SET_SEARCH_FILTER":
            return {
                ...state,
                filter: action.payload
            }
        default:
            return state
    }
}

export type InitialStateType = typeof initialState
export type SearchFilterType = typeof initialState.filter
type ActionsTypes = InferActionsType<typeof actions>

// actions
export const actions = {
    followSuccess: (userId: number) => ({type: 'USERS/FOLLOW', userId} as const),
    unfollowSuccess: (userId: number) => ({type: 'USERS/UNFOLLOW', userId} as const),
    setUsers: (users: Array<UsersType>) => ({type: 'USERS/SET_USERS', users} as const),
    setCurrentPage: (currentPage: number) => ({type: 'USERS/SET_CURRENT_PAGE', currentPage} as const),
    setSearchFilter: (filter: SearchFilterType) => ({type: 'USERS/SET_SEARCH_FILTER', payload: filter} as const),
    setTotalUsersCount: (totalUsersCount: number) => ({
        type: 'USERS/SET_TOTAL_USERS_COUNT',
        totalUsersCount
    } as const),
    toggleIsFetching: (isFetching: boolean) => ({
        type: 'USERS/TOGGLE_IS_FETCHING',
        isFetching
    } as const),
    toggleIsFollowing: (isFollow: boolean, userId: number) => ({
        type: 'USERS/TOGGLE_IS_FOLLOWING_PROGRESS',
        isFollow,
        userId
    } as const),
    setPageSize: (pageSize: number) => ({type: 'USERS/SET_PAGE_SIZE', pageSize} as const)
}

// definition types for thunks-creators
type GetStateType = () => AppStateType
type DispatchType = Dispatch<ActionsTypes>
type ThunkType = BaseThunkType<ActionsTypes>

// thunks-creators
export const requestUsers = (page: number, pageSize: number, filter: SearchFilterType): ThunkType => async (dispatch, getState: any) => {
    dispatch(actions.toggleIsFetching(true))
    dispatch(actions.setCurrentPage(page))
    dispatch(actions.setSearchFilter(filter))

    let data = await usersAPI.getUsers(page, pageSize, filter.term, filter.friend)

    dispatch(actions.toggleIsFetching(false))
    dispatch(actions.setUsers(data.items))
    dispatch(actions.setTotalUsersCount(data.totalCount))
}

const _followUnfollowFlow = async (dispatch: DispatchType,
                                   userID: number,
                                   apiMethod: (userID: number) => Promise<APIResponseType>,
                                   actionCreator: (userID: number) => ActionsTypes) => {
    dispatch(actions.toggleIsFollowing(true, userID))

    let data = await apiMethod(userID)

    if (data.resultCode === ResultCode.Success)
        dispatch(actionCreator(userID))

    dispatch(actions.toggleIsFollowing(false, userID))
}

export const follow = (userID: number): ThunkType => async (dispatch) => {
    await _followUnfollowFlow(dispatch, userID, usersAPI.follow.bind(usersAPI), actions.followSuccess)
}

export const unfollow = (userID: number): ThunkType => async (dispatch) => {
    await _followUnfollowFlow(dispatch, userID, usersAPI.unfollow.bind(usersAPI), actions.unfollowSuccess)
}

export default usersReducer