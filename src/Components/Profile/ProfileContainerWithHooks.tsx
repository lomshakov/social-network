import React, {useEffect} from 'react'
import {compose} from 'redux'
import {connect} from 'react-redux'
import {RouteComponentProps, withRouter} from 'react-router-dom'
import Profile from './Profile'
import {actions, getProfileData, getUserStatus, savePhoto, saveProfile, updateStatus} from '../../Redux/profile-reducer'
import {withAuthRedirect} from '../../hoc/withAuthRedirect'
import {AppStateType} from '../../Redux/redux-store'
import {ProfileType} from '../../types/types'

const ProfileContainerWithHooks: React.FC<MapStateToPropsType & MapDispatchToPropsType & RouteComponentProps<PathParamsType>> = ({
                                        profile, authorizedUserId, getProfileData,
                                        getUserStatus, status, updateStatus, isAuth,
                                        savePhoto, saveProfile, error, login, posts, addPost, ...props }) => {

    useEffect(() => {

        /* todo: think about initialization (getting userId) */
        let userId: number | null = +props.match.params.userId

        if (!props.match.params.userId) {
            userId = authorizedUserId
        }

        if (!userId) {
            console.error('ID should be exist in URI params or in a state')
        } else {
            getProfileData(userId)
            getUserStatus(userId)
        }
    })

    return <Profile {...props}
                    isOwner={!props.match.params.userId}
                    addPost={addPost}
                    profile={profile as ProfileType}
                    status={status}
                    updateStatus={updateStatus}
                    savePhoto={savePhoto}
                    saveProfile={saveProfile}
                    error={error}
                    login={login}
                    posts={posts}/>
}

type MapStateToPropsType = ReturnType<typeof mapStateToProps>

type MapDispatchToPropsType = {
    getProfileData: (userID: number | null) => void
    getUserStatus: (userID: number) => void
    updateStatus: (status: string) => void
    savePhoto: (file: any) => void
    saveProfile: (profile: ProfileType) => void
    addPost: (post: string) => void
}

let mapStateToProps = (state: AppStateType) => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    authorizedUserId: state.auth.userId,
    isAuth: state.auth.isAuth,
    error: state.profilePage.profileChangeError,
    login: state.auth.login,
    posts: state.profilePage.posts
})

type PathParamsType = {
    userId: string
}

// Your component own properties
type PropsType = RouteComponentProps<PathParamsType> & {
    someString: string,
}

export default compose(
    connect(mapStateToProps, {getProfileData, getUserStatus, updateStatus, savePhoto, saveProfile, addPost: actions.addPost}),
    withRouter,
    withAuthRedirect
)(ProfileContainerWithHooks)