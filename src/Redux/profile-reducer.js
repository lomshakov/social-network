import {profileAPI} from "../api/api";

const ADD_POST = 'profile/ADD-POST';
const DELETE_POST = 'profile/DELETE_POST';
const SET_USER_PROFILE = 'profile/SET_USER_PROFILE';
const SET_STATUS = 'profile/SET_STATUS';
const SAVE_PHOTO_SUCCESS = 'SAVE_PHOTO_SUCCESS';

// initial State
let initialState = {
    posts: [{id: 1, message: 'Hi to all!!!', likesCount: 15, date: '09.06.2019, 15:09:26'},
        {id: 2, message: 'Hello World', likesCount: 7, date: '16.02.2020, 03:54:26'},
        {id: 3, message: 'This is network', likesCount: 84, date: '30.06.2020, 10:12:26'},
        {id: 4, message: 'Fuck....uuu', likesCount: 11, date: '01.12.2020, 23:00:26'}
    ],

    profile: null,
    status: ''
};

// reducer
const profileReducer = (state= initialState, action) => {

    switch (action.type) {
        case ADD_POST:

            let newPost = {
                id: 5,
                message: action.post,
                likesCount: 0,
                date: new Date().toLocaleString()
            };

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
                profile: {...state.profile, photos: action.photos}
            }

        default:
            return state;
    }
};

// Action-creators
export const addPost = (post) => ({type: ADD_POST, post: post});
export const deletePost = (postId) => ({type: DELETE_POST, postId});
export const setUserProfile = (profile) => ({type: SET_USER_PROFILE, profile});
export const setStatus = (status) => ({type: SET_STATUS, status})
export const savePhotoSuccess = (photos) => ({type: SAVE_PHOTO_SUCCESS, photos})

// thunks
export const getProfileData = (userID) => async (dispatch) => {
    let response = await profileAPI.getProfileData(userID)
    dispatch(setUserProfile(response.data));
}

export const getUserStatus = (userID) => async (dispatch) => {
    let response = await profileAPI.getStatus(userID)
    dispatch(setStatus(response.data));
}

export const updateStatus = (status) => async (dispatch) => {
    let response = await profileAPI.updateStatus(status)
    if (response.data.resultCode === 0)
        dispatch(setStatus(status))
}

export const savePhoto = (file) => async (dispatch) => {

    let response = await profileAPI.savePhoto(file)

    if (response.data.resultCode === 0)
        dispatch(savePhotoSuccess(response.data.data.photos))
}

export default profileReducer;