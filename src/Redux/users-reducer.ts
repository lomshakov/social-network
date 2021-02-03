import { Dispatch } from 'redux'
import {ResultCode, usersAPI} from '../api/api'
import { updateObjectInArray } from '../utils/object-utils'
import { UsersType } from '../types/types'
import { ThunkAction } from 'redux-thunk'
import {AppStateType, InferActionsType} from './redux-store'

// initial state
let initialState = {
    users: [] as Array<UsersType>,
    pageSize: 10,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: [] as Array<number> // array of user IDs
}

type InitialStateType = typeof initialState

// reducer
const usersReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {

        case 'FOLLOW':
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, "id", {followed: true})
            }
        case 'UNFOLLOW':
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, "id", {followed: false})
            }
        case 'SET_USERS':
            return {...state, users: action.users}
        case 'SET_CURRENT_PAGE':
            return {...state, currentPage: action.currentPage}
        case 'SET_TOTAL_USERS_COUNT':
            return {...state, totalUsersCount: action.totalUsersCount}
        case 'TOGGLE_IS_FETCHING':
            return {...state, isFetching: action.isFetching}
        case 'TOGGLE_IS_FOLLOWING_PROGRESS':
            return {
                ...state,
                followingInProgress: action.isFollow
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id !== action.userId)
            }
        case 'SET_PAGE_SIZE':
            return {
                ...state,
                pageSize: action.pageSize
            }
        default:
            return state
    }
}

type ActionsTypes = InferActionsType<typeof actions>

// action-creators
export const actions = {
    followSuccess: (userId: number) => ({type: 'FOLLOW', userId} as const),
    unfollowSuccess: (userId: number) => ({type: 'UNFOLLOW', userId} as const),
    setUsers: (users: Array<UsersType>) => ({type: 'SET_USERS', users} as const),
    setCurrentPage: (currentPage: number) => ({type: 'SET_CURRENT_PAGE', currentPage} as const),
    setTotalUsersCount: (totalUsersCount: number) => ({
        type: 'SET_TOTAL_USERS_COUNT',
        totalUsersCount
    } as const),
    toggleIsFetching: (isFetching: boolean) => ({
        type: 'TOGGLE_IS_FETCHING',
        isFetching
    } as const),
    toggleIsFollowing: (isFollow: boolean, userId: number) => ({
        type: 'TOGGLE_IS_FOLLOWING_PROGRESS',
        isFollow,
        userId
    } as const),
    setPageSize: (pageSize: number) => ({type: 'SET_PAGE_SIZE', pageSize} as const)
}

// definition types for thunks-creators
type GetStateType = () => AppStateType
type DispatchType = Dispatch<ActionsTypes>
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>

// thunks-creators
export const requestUsers = (page: number, pageSize: number): ThunkType => async (dispatch, getState: any) => {
    dispatch(actions.toggleIsFetching(true))
    dispatch(actions.setCurrentPage(page))

    let data = await usersAPI.getUsers(page, pageSize)

    dispatch(actions.toggleIsFetching(false))
    dispatch(actions.setUsers(data.items))
    dispatch(actions.setTotalUsersCount(data.totalCount))
}

const _followUnfollowFlow = async (dispatch: DispatchType,
                                   userID: number,
                                   apiMethod: any,
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