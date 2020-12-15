import * as React from "react";
import PostsOnWall from "./PostsOnWall";
import {connect} from "react-redux";
import {addPostActionCreator, updatePostTextActionCreator} from "../../../../Redux/profile-reducer";


let mapStateToProps = (state) => {
    return {
        state: state.profilePage
    }
};

let mapDispatchToProps = (dispatch) => {
    return {
        addPost: () => dispatch(addPostActionCreator()),
        updateNewPostText: (text) => dispatch(updatePostTextActionCreator(text))
    }
};


let PostsOnWallContainer = connect(mapStateToProps, mapDispatchToProps)(PostsOnWall);

export default PostsOnWallContainer;