import React, {useState} from 'react'
import style from './../Profile.module.css'
import 'antd/dist/antd.css'
import {Input, message} from 'antd'
import Preloader from '../../common/Preloader/Preloader'
import userPhoto from '../../../assets/images/user.png'
import {ProfileDataEdit} from './ProfileDataEdit'
import {ProfileType} from '../../../types/types'
import {useDispatch, useSelector} from 'react-redux'
import {getErrorSelector, getProfileSelector} from '../../../Redux/profile-selectors'
import {savePhoto, saveProfile} from '../../../Redux/profile-reducer'
import {ProfileData} from './ProfileData'

type PropsType = {
    isOwner: boolean
}

export const ProfileInfo: React.FC<PropsType> = React.memo(({ isOwner }) => {

    let [editMode, setEditMode] = useState(false)
    const profile = useSelector(getProfileSelector)
    const error = useSelector(getErrorSelector)
    const dispatch = useDispatch()

    if (!profile) {
        return <Preloader/>
    }

    const onChange = (e: any) => {
        if (e.target.files.length) {
            dispatch(savePhoto(e.target.files[0]))
        }
    }

    const submitProfileData = async (values: ProfileType) => {
        await dispatch(saveProfile(values))
        setEditMode(false)
        if (error !== '') message.error(error)
    }

    return (
        <div className={style.profileInfo}>
            <div className={style.avatar}>
                <img src={profile.photos.large || userPhoto} alt='Profile Photo'/>
                {isOwner && <Input type={'file'} onChange={onChange}/>}
            </div>
            {editMode ? <ProfileDataEdit profile={profile} handleSubmit={submitProfileData}
                                         deactivateEditMode={() => setEditMode(false)}/>
                      : <ProfileData profile={profile} isOwner={isOwner} activateEditMode={() => setEditMode(true)}/>}

        </div>
    )
})