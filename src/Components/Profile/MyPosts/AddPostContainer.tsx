import React from 'react'
import { addPost } from '../../../Redux/profile-reducer'
import AddPost from './AddPost'
import { connect } from 'react-redux'
import { AppStateType } from '../../../Redux/redux-store'
import { PostType } from '../../../types/types'

class AddPostContainer extends React.Component<MapDispatchToPropsType> {
    render() {
        return <AddPost addPost={this.props.addPost}/>
    }
}

/*type MapStateToPropsType = {
    posts: Array<PostType>
}*/

type MapDispatchToPropsType = {
    addPost: (formData: any) => void
}

/*const mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        posts: state.profilePage.posts
    }
}*/

export default connect(null, { addPost })(AddPostContainer)