import React from 'react'
import style from '../Profile.module.css'
import {Button} from 'antd'
import {ProfileStatus} from './ProfileStatus'
import {ContactsType, ProfileType} from '../../../types/types'

type ProfileDataPropsType = {
    profile: ProfileType
    activateEditMode: () => void
    isOwner: boolean
}

export const ProfileData: React.FC<ProfileDataPropsType> = ({ profile, isOwner, activateEditMode }) => {

    return (
        <div className={style.profileDescription}>

            {isOwner && <Button type='default' onClick={activateEditMode}>Edit</Button>}
            <h3 className={style.name}>{profile?.fullName}</h3>

            <ProfileStatus />

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