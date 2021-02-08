import React from 'react'
import style from './Profile.module.css'
import ProfileInfo from './ProfileInfo/ProfileInfo'
import Posts from './MyPosts/Post/Posts'
import AddPost from './MyPosts/AddPost'
import {PostType, ProfileType} from '../../types/types'

/* todo: refactor to container? */

type PropsType = {
    profile: ProfileType
    status: string
    error: string
    updateStatus: (status: string) => void
    savePhoto: (file: any) => void
    saveProfile: (profile: ProfileType) => void
    isOwner: boolean
    login: string | null
    posts: Array<PostType>
    addPost: (post: string) => void
}

const Profile:React.FC<PropsType> = ({ profile, status, updateStatus,
                                         saveProfile, savePhoto, isOwner,
                                         error, login, posts, addPost }) => {

    return (
        <div className={style.profile}>
            <ProfileInfo profile={profile}
                         isOwner={isOwner}
                         status={status}
                         updateStatus={updateStatus}
                         savePhoto={savePhoto}
                         saveProfile={saveProfile}
                         error={error}/>
            <AddPost addPost={addPost}/>
            <Posts login={login} posts={posts}/>
        </div>
    )
}

export default Profile