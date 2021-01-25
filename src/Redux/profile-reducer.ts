import {profileAPI} from '../api/api'
import {PhotosType, PostType, ProfileType} from "../types/types";

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
};

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

// Action-creators
export const addPost = (post: string): AddPostActionType => ({type: ADD_POST, post})
export const deletePost = (postId: number): DeletePostActionType => ({type: DELETE_POST, postId})
export const setUserProfile = (profile: ProfileType): SetUserProfileActionType => ({type: SET_USER_PROFILE, profile})
export const setStatus = (status: string): SetStatusActionType => ({type: SET_STATUS, status})
export const savePhotoSuccess = (photos: PhotosType): SavePhotoSuccessActionType => ({type: SAVE_PHOTO_SUCCESS, photos})
export const setProfileChangeError = (error: string): SetProfileChangeErrorActionType => ({type: SET_PROFILE_CHANGE_ERROR, error})

// thunks
export const getProfileData = (userID: number) => async (dispatch: any) => {
    let response = await profileAPI.getProfileData(userID)
    dispatch(setUserProfile(response.data))
}

export const getUserStatus = (userID: number) => async (dispatch: any) => {
    let response = await profileAPI.getStatus(userID)
    dispatch(setStatus(response.data))
}

export const updateStatus = (status: string) => async (dispatch: any) => {
    try {
        let response = await profileAPI.updateStatus(status)
        if (response.data.resultCode === 0) {
            dispatch(setStatus(status))
        }
    } catch (error) {
        // debugger
        // alert(error)
    }
}

export const savePhoto = (file: any) => async (dispatch: any) => {
    let response = await profileAPI.savePhoto(file)
    if (response.data.resultCode === 0)
        dispatch(savePhotoSuccess(response.data.data.photos))
}

export const saveProfile = (profile: ProfileType) => async (dispatch: any, getState: any) => {
    const userId = getState().auth.userId
    let response = await profileAPI.saveProfile(profile)

    response.data.resultCode === 0
        ? dispatch(getProfileData(userId))
        : dispatch(setProfileChangeError(response.data.messages[0]))

}

export default profileReducer