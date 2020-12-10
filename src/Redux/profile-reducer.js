const ADD_POST = 'ADD-POST';
const UPDATE_POST_TEXT = 'UPDATE-POST-TEXT';

const profileReducer = (state, action) => {

    switch (action.type) {
        case ADD_POST:
            let newPost = {
                id: 5,
                message: state.inputPostText,
                likesCount: 0,
                date: new Date().toLocaleString()
            };
            state.inputPostText='';
            state.posts.push(newPost);
            return state;
        case UPDATE_POST_TEXT:
            state.inputPostText = action.newText;
            return state;
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