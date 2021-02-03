import React, { useEffect } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import Profile from './Profile'
import { getProfileData, getUserStatus, savePhoto, saveProfile, updateStatus } from '../../Redux/profile-reducer'
import { withAuthRedirect } from '../../hoc/withAuthRedirect'
import { AppStateType } from '../../Redux/redux-store'
import { ProfileType } from '../../types/types'

const ProfileContainerWithHooks: React.FC<MapStateToPropsType & MapDispatchToPropsType> = ({
                                        profile, authorizedUserId, getProfileData,
                                        getUserStatus, status, updateStatus, isAuth,
                                        savePhoto, saveProfile, error, ...props }) => {

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
                    savePhoto={savePhoto}
                    saveProfile={saveProfile}
                    error={error}/>
}

type MapStateToPropsType = {
    profile: ProfileType | null
    status: string
    authorizedUserId: number | null
    isAuth: boolean
    error: string
}

type MapDispatchToPropsType = {
    getProfileData: (userID: number | null) => void
    getUserStatus: (userID: number) => void
    updateStatus: (status: string) => void
    savePhoto: (file: any) => void
    saveProfile: (profile: ProfileType) => void
}

let mapStateToProps = (state: AppStateType): MapStateToPropsType => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    authorizedUserId: state.auth.userId,
    isAuth: state.auth.isAuth,
    error: state.profilePage.profileChangeError
})

export default compose(
    connect(mapStateToProps, {getProfileData, getUserStatus, updateStatus, savePhoto, saveProfile}),
    withRouter,
    withAuthRedirect
)(ProfileContainerWithHooks)