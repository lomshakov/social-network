import * as React from "react";
import {addPost} from "../../../Redux/profile-reducer";
import AddPostWall from "./AddPostWall";
import {connect} from "react-redux";

class AddPostWallContainer extends React.Component {
    render() {
        return <AddPostWall {...this.props}/>
    }
}

const mapStateToProps = (state) => {
    return {
        state: state.profilePage
    }
};

export default connect(mapStateToProps, {addPost})(AddPostWallContainer);