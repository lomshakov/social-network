const ADD_POST = 'ADD-POST';
const UPDATE_POST_TEXT = 'UPDATE-POST-TEXT';

let initialState = {
    posts: [{id: 1, message: 'Hi to all!!!', likesCount: 15, date: '09.06.2019, 15:09:26'},
        {id: 2, message: 'Hello World', likesCount: 7, date: '16.02.2020, 03:54:26'},
        {id: 3, message: 'This is network', likesCount: 84, date: '30.06.2020, 10:12:26'},
        {id: 4, message: 'Fuck....uuu', likesCount: 11, date: '01.12.2020, 23:00:26'}
    ],

    inputPostText: ''
};

const profileReducer = (state= initialState, action) => {

    switch (action.type) {
        case ADD_POST: {
            let newPost = {
                id: 5,
                message: state.inputPostText,
                likesCount: 0,
                date: new Date().toLocaleString()
            };

            let stateCopy = {...state};
            stateCopy.posts = [...state.posts];
            stateCopy.posts.push(newPost);
            stateCopy.inputPostText='';

            return stateCopy;}
        case UPDATE_POST_TEXT:
            let stateCopy = {...state};
            stateCopy.inputPostText = action.newText;
            return stateCopy;
        default:
            return state;
    }
};

export const addPostActionCreator = () => ({
    type: ADD_POST
});
export const updatePostTextActionCreator = (text) => ({
    type: UPDATE_POST_TEXT,
    newText: text
});

export default profileReducer;