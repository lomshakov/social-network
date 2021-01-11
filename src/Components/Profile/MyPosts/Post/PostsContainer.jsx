import * as React from "react";
import Posts from "./Posts";
import {connect} from "react-redux";


let mapStateToProps = (state) => {
    return {
        posts: state.profilePage.posts,
        login: state.auth.login
    }
};

let PostsContainer = connect(mapStateToProps, null)(Posts);

export default PostsContainer;