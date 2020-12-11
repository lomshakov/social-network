import * as React from "react";
import {addPostActionCreator, updatePostTextActionCreator} from "../../../Redux/profile-reducer";
import MyPosts from "./MyPosts";



const MyPostsContainer = (props) => {


    let state = props.store.getState();

    let addPost = () => {
        props.store.dispatch(addPostActionCreator());
    }

    let updateNewPostText = (text) => {
        props.store.dispatch(updatePostTextActionCreator(text));
    }

    return (
        <MyPosts updateNewPostText={updateNewPostText} addPost={addPost} state={state.profilePage}/>
    )
};

export default MyPostsContainer;