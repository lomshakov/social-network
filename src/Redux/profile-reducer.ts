import { ResultCode } from '../api/api'
import { profileAPI } from '../api/profile-api'
import { PhotosType, PostType, ProfileType } from '../types/types'
import {AppStateType, BaseThunkType, InferActionsType} from './redux-store'

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

// reducer
const profileReducer = (state = initialState, action: any): InitialStateType => {

    switch (action.type) {
        case 'PROFILE/ADD_POST':

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
        case 'PROFILE/DELETE_POST':

            return {
                ...state,
                posts: [...state.posts].filter(post => post.id !== action.postId)
            }
        case 'PROFILE/SET_USER_PROFILE':
            return {
                ...state,
                profile: action.profile
            }
        case 'PROFILE/SET_STATUS':
            return {
                ...state,
                status: action.status
            }
        case 'PROFILE/SAVE_PHOTO_SUCCESS':
            return {
                ...state,
                profile: {...state.profile, photos: action.photos} as ProfileType
            }
        case 'PROFILE/SET_PROFILE_CHANGE_ERROR':
            return {
                ...state,
                profileChangeError: action.payload
            }

        default:
            return state
    }
}

export type InitialStateType = typeof initialState
type ActionsTypes = InferActionsType<typeof actions>

// actions
export const actions = {
    addPost: (post: string) => ({type: 'PROFILE/ADD_POST', post} as const),
    deletePost: (postId: number) => ({type: 'PROFILE/DELETE_POST', postId} as const),
    setUserProfile: (profile: ProfileType) => ({type: 'PROFILE/SET_USER_PROFILE', profile} as const),
    setStatus: (status: string) => ({type: 'PROFILE/SET_STATUS', status} as const),
    savePhotoSuccess: (photos: PhotosType) => ({type: 'PROFILE/SAVE_PHOTO_SUCCESS', photos} as const),
    setProfileChangeError: (error: string) => ({type: 'PROFILE/SET_PROFILE_CHANGE_ERROR', error} as const)
}

type GetStateType = () => AppStateType
type ThunkType = BaseThunkType<ActionsTypes>

// thunks
export const getProfileData = (userID: number | null): ThunkType => async (dispatch) => {
    let data = await profileAPI.getProfileData(userID)
    dispatch(actions.setUserProfile(data))
}

export const getUserStatus = (userID: number): ThunkType => async (dispatch) => {
    let data = await profileAPI.getStatus(userID)
    dispatch(actions.setStatus(data))
}

export const updateStatus = (status: string): ThunkType => async (dispatch) => {
    try {
        let data = await profileAPI.updateStatus(status)
        if (data.resultCode === ResultCode.Success) {
            dispatch(actions.setStatus(status))
        }
    } catch (error) {
        // debugger
        // alert(error)
    }
}

export const savePhoto = (file: File): ThunkType => async (dispatch) => {
    let data = await profileAPI.savePhoto(file)
    if (data.resultCode === ResultCode.Success)
        dispatch(actions.savePhotoSuccess(data.data.photos))
}

export const saveProfile = (profile: ProfileType): ThunkType => async (dispatch: any, getState: GetStateType) => {
    const userId = getState().auth.userId
    let data = await profileAPI.saveProfile(profile)

    data.resultCode === ResultCode.Success
        ? dispatch(getProfileData(userId))
        : dispatch(actions.setProfileChangeError(data.messages[0]))
}

export default profileReducer