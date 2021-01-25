import React, { useEffect } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import Profile from './Profile'
import { getProfileData, getUserStatus, savePhoto, saveProfile, updateStatus } from '../../Redux/profile-reducer'
import { withAuthRedirect } from '../../hoc/withAuthRedirect'
const ProfileContainerWithHooks = ({ profile, authorizedUserId, getProfileData, getUserStatus, status, updateStatus, isAuth, savePhoto, saveProfile, error, ...props }) => {

    useEffect(() => {
        let userId = props.match.params.userId

        if (!props.match.params.userId) {
            userId = authorizedUserId
        }

        getProfileData(userId)
        getUserStatus(userId)
    })

    return <Profile {...props}
                    isOwner={!props.match.params.userId}
                    profile={profile}
                    status={status}
                    updateStatus={updateStatus}
                    isAuth={isAuth}
                    savePhoto={savePhoto}
                    saveProfile={saveProfile}
                    error={error}/>
}


let mapStateToProps = (state) => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    authorizedUserId: state.auth.userId,
    isAuth: state.auth.isAuth,
    error: state.profilePage.profileChangeError
});

export default compose(
    connect(mapStateToProps, {getProfileData, getUserStatus, updateStatus, savePhoto, saveProfile}),
    withRouter,
    withAuthRedirect
)(ProfileContainerWithHooks)