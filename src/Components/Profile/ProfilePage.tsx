import React, {useEffect} from 'react'
import {compose} from 'redux'
import {useDispatch, useSelector} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {getProfileData, getUserStatus} from '../../Redux/profile-reducer'
import {withAuthRedirect} from '../../hoc/withAuthRedirect'
import {getUserIdSelector} from '../../Redux/auth-selectors'
import style from './Profile.module.css'
import {ProfileInfo} from './ProfileInfo/ProfileInfo'
import {AddPost} from './MyPosts/AddPost'
import {Posts} from './MyPosts/Posts'

const ProfilePage: React.FC<any> = ({...props }) => {

    const authorizedUserId = useSelector(getUserIdSelector)
    const dispatch = useDispatch()

    useEffect(() => {

        /* todo: think about initialization (getting userId) */
        let userId: number | null = +props.match.params.userId

        if (!props.match.params.userId) {
            userId = authorizedUserId
        }

        if (!userId) {
            console.error('ID should be exist in URI params or in a state')
        } else {
            dispatch(getProfileData(userId))
            dispatch(getUserStatus(userId))
        }
    })

    return (
        <div className={style.profile}>
            <ProfileInfo isOwner={!props.match.params.userId}/>
            <AddPost/>
            <Posts/>
        </div>
    )
}

export default compose(withRouter, withAuthRedirect)(ProfilePage)