import * as React from "react";
import PostsOnWall from "./PostsOnWall";
import {connect} from "react-redux";


let mapStateToProps = (state) => {
    return {
        state: state.profilePage
    }
};

let PostsOnWallContainer = connect(mapStateToProps, null)(PostsOnWall);

export default PostsOnWallContainer;