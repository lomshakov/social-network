import {profileAPI} from "../api/api";

const ADD_POST = 'ADD-POST';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_STATUS = 'SET_STATUS';
const UPDATE_STATUS = 'UPDATE_STATUS';

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

        default:
            return state;
    }
};

// Action-creators
export const addPost = (post) => ({type: ADD_POST, post: post});
export const setUserProfile = (profile) => ({type: SET_USER_PROFILE, profile});
export const setStatus = (status) => ({type: SET_STATUS, status})

// thunks
export const getProfileData = (userID) => {
    return (dispatch) => {
        profileAPI.getProfileData(userID)
            .then(response => {
                dispatch(setUserProfile(response.data));
            });
    }
}

export const getUserStatus = (userID) => {
    return (dispatch) => {
        profileAPI.getStatus(userID)
            .then(response => {
                dispatch(setStatus(response.data));
            });
    }
}

export const updateStatus = (status) => {
    return (dispatch) => {
        profileAPI.updateStatus(status)
            .then(response => {
                if (response.data.resultCode === 0)
                    dispatch(setStatus(status))
            })
    }
}

export default profileReducer;