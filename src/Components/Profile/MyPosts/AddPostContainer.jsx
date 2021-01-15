import * as React from "react";
import {addPost} from "../../../Redux/profile-reducer";
import AddPost from "./AddPost";
import {connect} from "react-redux";

class AddPostContainer extends React.Component {
    render() {
        return <AddPost {...this.props}/>
    }
}

const mapStateToProps = (state) => {
    return {
        state: state.profilePage
    }
};

export default connect(mapStateToProps, {addPost})(AddPostContainer);