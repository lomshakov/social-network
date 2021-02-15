import React from 'react'
import style from './Profile.module.css'
import {ProfileInfo} from './ProfileInfo/ProfileInfo'
import {Posts} from './MyPosts/Post/Posts'
import {AddPost} from './MyPosts/AddPost'

type PropsType = {
    isOwner: boolean
}

export const Profile:React.FC<PropsType> = ({ isOwner }) => {

    return (
        <div className={style.profile}>
            <ProfileInfo isOwner={isOwner}/>
            <AddPost/>
            <Posts/>
        </div>
    )
}