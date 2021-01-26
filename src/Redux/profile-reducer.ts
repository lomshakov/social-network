import { profileAPI, ResultCode } from '../api/api'
import { PhotosType, PostType, ProfileType } from '../types/types'
import { Dispatch } from 'redux'
import { ThunkAction } from 'redux-thunk'
import { AppStateType } from './redux-store'

// string types
const ADD_POST = 'PROFILE/ADD-POST'
const DELETE_POST = 'PROFILE/DELETE_POST'
const SET_USER_PROFILE = 'PROFILE/SET_USER_PROFILE'
const SET_STATUS = 'PROFILE/SET_STATUS'
const SAVE_PHOTO_SUCCESS = 'PROFILE/SAVE_PHOTO_SUCCESS'
const SET_PROFILE_CHANGE_ERROR = 'PROFILE/SET_PROFILE_CHANGE_ERROR'

// initial State
let initialState = {
    posts: [{id: 1, message: 'Hi to all!!!', likesCount: 15, date: '09.06.2019, 15:09:26'},
            {id: 2, message: 'Hello World', likesCount: 7, date: '16.02.2020, 03:54:26'},
            {id: 3, message: 'This is network', likesCount: 84, date: '30.06.2020, 10:12:26'},
            {id: 4, message: 'Fuck....uuu', likesCount: 11, date: '01.12.2020, 23:00:26'}
    ] as Array<PostType>,
    profile: null as ProfileType | null,
    status: '',
    profileChangeError: ''
}

type InitialStateType = typeof initialState

// reducer
const profileReducer = (state = initialState, action: any): InitialStateType => {

    switch (action.type) {
        case ADD_POST:

            let newPost = {
                id: 5,
                message: action.post,
                likesCount: 0,
                date: new Date().toLocaleString()
            }

            return {
                ...state,
                posts: [...state.posts, newPost]
            }
        case DELETE_POST:

            return {
                ...state,
                posts: [...state.posts].filter(post => post.id !== action.postId)
            }
        case SET_USER_PROFILE:
            return {
                ...state,
                profile: action.profile
            }
        case SET_STATUS:
            return {
                ...state,
                status: action.status
            }
        case SAVE_PHOTO_SUCCESS:
            return {
                ...state,
                profile: {...state.profile, photos: action.photos} as ProfileType
            }
        case SET_PROFILE_CHANGE_ERROR:
            return {
                ...state,
                profileChangeError: action.payload
            }

        default:
            return state
    }
};

// definition types for Action creators
type AddPostActionType = {
    type: typeof ADD_POST
    post: string
}
type DeletePostActionType = {
    type: typeof DELETE_POST
    postId: number
}
type SetUserProfileActionType = {
    type: typeof SET_USER_PROFILE
    profile: ProfileType
}
type SetStatusActionType = {
    type: typeof SET_STATUS
    status: string
}
type SavePhotoSuccessActionType = {
    type: typeof SAVE_PHOTO_SUCCESS
    photos: PhotosType
}
type SetProfileChangeErrorActionType = {
    type: typeof SET_PROFILE_CHANGE_ERROR
    error: string
}

// main actions type
type ActionsTypes = AddPostActionType | DeletePostActionType | SetUserProfileActionType | SetStatusActionType
                    | SavePhotoSuccessActionType | SetProfileChangeErrorActionType

// Action-creators
export const addPost = (post: string): AddPostActionType => ({type: ADD_POST, post})
export const deletePost = (postId: number): DeletePostActionType => ({type: DELETE_POST, postId})
export const setUserProfile = (profile: ProfileType): SetUserProfileActionType => ({type: SET_USER_PROFILE, profile})
export const setStatus = (status: string): SetStatusActionType => ({type: SET_STATUS, status})
export const savePhotoSuccess = (photos: PhotosType): SavePhotoSuccessActionType => ({type: SAVE_PHOTO_SUCCESS, photos})
export const setProfileChangeError = (error: string): SetProfileChangeErrorActionType => ({type: SET_PROFILE_CHANGE_ERROR, error})

// definition types for thunks-creators
type DispatchType = Dispatch<ActionsTypes>
type GetStateType = () => AppStateType
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>

// thunks
export const getProfileData = (userID: number | null): ThunkType => async (dispatch: DispatchType) => {
    let data = await profileAPI.getProfileData(userID)
    dispatch(setUserProfile(data))
}

export const getUserStatus = (userID: number): ThunkType => async (dispatch: DispatchType) => {
    let data = await profileAPI.getStatus(userID)
    dispatch(setStatus(data))
}

export const updateStatus = (status: string): ThunkType => async (dispatch: DispatchType) => {
    try {
        let data = await profileAPI.updateStatus(status)
        if (data.resultCode === ResultCode.Success) {
            dispatch(setStatus(status))
        }
    } catch (error) {
        // debugger
        // alert(error)
    }
}

export const savePhoto = (file: any): ThunkType => async (dispatch: DispatchType) => {
    let data = await profileAPI.savePhoto(file)
    if (data.resultCode === ResultCode.Success)
        dispatch(savePhotoSuccess(data.data))
}

export const saveProfile = (profile: ProfileType): ThunkType => async (dispatch: any, getState: GetStateType) => {
    const userId = getState().auth.userId
    let data = await profileAPI.saveProfile(profile)

    data.resultCode === ResultCode.Success
        ? dispatch(getProfileData(userId))
        : dispatch(setProfileChangeError(data.messages[0]))
}

export default profileReducer