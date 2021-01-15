import {usersAPI} from "../api/api";
import {updateObjectInArray} from "../utils/object-utils";

const FOLLOW = 'users/FOLLOW';
const UNFOLLOW = 'users/UNFOLLOW';
const SET_USERS = 'users/SET_USERS';
const SET_CURRENT_PAGE = 'users/SET_CURRENT_PAGE';
const SET_TOTAL_USERS_COUNT = 'users/SET_TOTAL_USERS_COUNT';
const TOGGLE_IS_FETCHING = 'users/TOGGLE_IS_FETCHING';
const TOGGLE_IS_FOLLOWING_PROGRESS = 'users/TOGGLE_IS_FOLLOWING_PROGRESS';
const SET_PAGE_SIZE = "users/SET_PAGE_SIZE";

let initialState = {
    users: [],
    pageSize: 10,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: []
};

const usersReducer = (state = initialState, action) => {

    switch (action.type) {

        case FOLLOW:
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, "id", {followed: true})
            }
        case UNFOLLOW:
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, "id", {followed: false})
            }
        case SET_USERS:
            return {...state, users: action.users}
        case SET_CURRENT_PAGE:
            return {...state, currentPage: action.currentPage}
        case SET_TOTAL_USERS_COUNT:
            return {...state, totalUsersCount: action.totalUsersCount}
        case TOGGLE_IS_FETCHING:
            return {...state, isFetching: action.isFetching}
        case TOGGLE_IS_FOLLOWING_PROGRESS:
            return {
                ...state,
                followingInProgress: action.isFollow
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id !== action.userId)
            }
        case SET_PAGE_SIZE:
            return {
                ...state,
                pageSize: action.pageSize
            }
        default:
            return state;
    }
};

export const followSuccess = (userId) => ({type: FOLLOW, userId});
export const unfollowSuccess = (userId) => ({type: UNFOLLOW, userId});
export const setUsers = (users) => ({type: SET_USERS, users});
export const setCurrentPage = (currentPage) => ({type: SET_CURRENT_PAGE, currentPage});
export const setTotalUsersCount = (totalUsersCount) => ({type: SET_TOTAL_USERS_COUNT, totalUsersCount});
export const toggleIsFetching = (isFetching) => ({type: TOGGLE_IS_FETCHING, isFetching});
export const toggleIsFollowing = (isFollow, userId) => ({type: TOGGLE_IS_FOLLOWING_PROGRESS, isFollow, userId});
export const setPageSize = (pageSize) => ({type: SET_PAGE_SIZE, pageSize});


export const requestUsers = (page, pageSize) => async (dispatch) => {

    dispatch(toggleIsFetching(true));
    dispatch(setCurrentPage(page));

    let response = await usersAPI.getUsers(page, pageSize)

    dispatch(toggleIsFetching(false));
    dispatch(setUsers(response.items));
    dispatch(setTotalUsersCount(response.totalCount));
}

const followUnfollowFlow = async (dispatch, userID, apiMethod, actionCreator) => {
    dispatch(toggleIsFollowing(true, userID));

    let response = await apiMethod(userID)
    if (response.data.resultCode === 0)
        dispatch(actionCreator(userID))

    dispatch(toggleIsFollowing(false, userID));

}

export const follow = (userID) => async (dispatch) => {
    await followUnfollowFlow(dispatch, userID, usersAPI.follow.bind(usersAPI), followSuccess);
}


export const unfollow = (userID) => async (dispatch) => {
    await followUnfollowFlow(dispatch, userID, usersAPI.unfollow.bind(usersAPI), unfollowSuccess);
}

export default usersReducer;