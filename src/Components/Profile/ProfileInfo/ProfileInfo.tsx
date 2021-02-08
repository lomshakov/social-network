import React, {useState} from 'react'
import style from './../Profile.module.css'
import 'antd/dist/antd.css'
import {Button, Input, message} from 'antd'
import Preloader from '../../common/Preloader/Preloader'
import ProfileStatus from './ProfileStatus'
import userPhoto from '../../../assets/images/user.png'
import ProfileDataEdit from './ProfileDataEdit'
import {ContactsType, ProfileType} from '../../../types/types'

type PropsType = {
    profile: ProfileType
    status: string
    error: string
    updateStatus: (status: string) => void
    savePhoto: (file: any) => void
    saveProfile: (profile: ProfileType) => void
    isOwner: boolean
}

const ProfileInfo: React.FC<PropsType> = ({ profile, isOwner, status, updateStatus, savePhoto, saveProfile, error }) => {

    let [editMode, setEditMode] = useState(false)

    if (!profile) {
        return <Preloader/>
    }

    const onChange = (e: any) => {
        if (e.target.files.length) {
            savePhoto(e.target.files[0])
        }
    }

    const handleSubmit = async (values: ProfileType) => {
        await saveProfile(values)
        setEditMode(false)
        if (error !== '') message.error(error)
    }

    return (
        <div className={style.profileInfo}>
            <div className={style.avatar}>
                <img src={profile.photos.large || userPhoto} alt='Profile Photo'/>
                {isOwner && <Input type={'file'} onChange={onChange}/>}
            </div>
            {editMode ? <ProfileDataEdit profile={profile} handleSubmit={handleSubmit}
                                         deactivateEditMode={() => setEditMode(false)}/>
                      : <ProfileData profile={profile} status={status} updateStatus={updateStatus}
                                     isOwner={isOwner} activateEditMode={() => setEditMode(true)}/>}

        </div>
    )
}

type ProfileDataPropsType = {
    profile: ProfileType
    status: string
    updateStatus: (status: string) => void
    activateEditMode: () => void
    isOwner: boolean
}

const ProfileData: React.FC<ProfileDataPropsType> = ({ profile, status, updateStatus, isOwner, activateEditMode }) => {

    return (
        <div className={style.profileDescription}>

            {isOwner && <Button type='default' onClick={activateEditMode}>Edit</Button>}
            <h3 className={style.name}>{profile.fullName}</h3>
            <ProfileStatus status={status}
                           updateStatus={updateStatus} />
            <div>Looking for a job: {profile.lookingForAJob ? "yes" : "no"}</div>
            {profile.lookingForAJob && <div>My skills: {profile.lookingForAJobDescription}</div>}
            <div>About me: {profile.aboutMe}</div>
            <div>
                Contacts:

                {Object.keys(profile.contacts).map(key => {
                    return <Contact key={key} contactTitle={key} contactValue={profile.contacts[key as keyof ContactsType]}/>
                })}

            </div>
        </div>
    )
}

type ContactPropsType = {
    contactTitle: string
    contactValue: string
}

const Contact: React.FC<ContactPropsType> = ({ contactTitle, contactValue }) => {
    return (
        <div>
            {contactValue && <div>{contactTitle}: {contactValue}</div>}
        </div>
    )
}

export default ProfileInfo