const ADD_POST = 'ADD-POST';
const UPDATE_POST_TEXT = 'UPDATE-POST-TEXT';
const SET_USER_PROFILE = 'SET_USER_PROFILE';

let initialState = {
    posts: [{id: 1, message: 'Hi to all!!!', likesCount: 15, date: '09.06.2019, 15:09:26'},
        {id: 2, message: 'Hello World', likesCount: 7, date: '16.02.2020, 03:54:26'},
        {id: 3, message: 'This is network', likesCount: 84, date: '30.06.2020, 10:12:26'},
        {id: 4, message: 'Fuck....uuu', likesCount: 11, date: '01.12.2020, 23:00:26'}
    ],

    profile: null,
    inputPostText: ''
};

const profileReducer = (state= initialState, action) => {

    switch (action.type) {
        case ADD_POST:

            let newPost = {
                id: 5,
                message: state.inputPostText,
                likesCount: 0,
                date: new Date().toLocaleString()
            };

            return {
                ...state,
                inputPostText: '',
                posts: [...state.posts, newPost]
            }

        case UPDATE_POST_TEXT:

            return {
                ...state,
                inputPostText: action.newText
            }

        case SET_USER_PROFILE:
            return {
                ...state,
                profile: action.profile
            }

        default:
            return state;
    }
};

export const addPostActionCreator = () => ({
    type: ADD_POST
});

export const setUserProfile = (profile) => ({
    type: SET_USER_PROFILE,
    profile
});

export const updatePostTextActionCreator = (text) => ({
    type: UPDATE_POST_TEXT,
    newText: text
});

export default profileReducer;