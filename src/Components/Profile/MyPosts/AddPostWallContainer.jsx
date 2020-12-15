import * as React from "react";
import {addPostActionCreator, updatePostTextActionCreator} from "../../../Redux/profile-reducer";
import AddPostWall from "./AddPostWall";
import {connect} from "react-redux";


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


let MyPostContainer = connect(mapStateToProps, mapDispatchToProps)(AddPostWall);

export default MyPostContainer;