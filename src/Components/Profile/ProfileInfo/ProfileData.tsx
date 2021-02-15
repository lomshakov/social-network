import React from 'react'
import styles from '../Profile.module.css'
import {Button} from 'antd'
import {ProfileStatus} from './ProfileStatus'
import {ContactsType, ProfileType} from '../../../types/types'

type ProfileDataPropsType = {
    profile: ProfileType
}

export const ProfileData: React.FC<ProfileDataPropsType> = ({ profile }) => {

    return (
        <div className={styles.profileDescription}>

            {/*{isOwner && <Button type='default' onClick={activateEditMode}>Edit</Button>}*/}
            <h2 className={styles.name}>{profile?.fullName}</h2>

            <ProfileStatus />

            <div className={styles.profile__data}>
                <div>
                    <span className={styles.profile__data__title}>Looking for a job: </span>
                    {profile.lookingForAJob ? "yes" : "no"}
                </div>
                <div>
                    <span className={styles.profile__data__title}>My skills: </span>
                    {profile.lookingForAJobDescription}
                </div>
                <div>
                    <span className={styles.profile__data__title}>About me: </span>
                    {profile.aboutMe}
                </div>

                <div>
                    <div className={styles.contacts__title}>Contacts:</div>

                    {Object.keys(profile.contacts).map(key => {
                        return <Contact key={key} contactTitle={key} contactValue={profile.contacts[key as keyof ContactsType]}/>
                    })}

                </div>
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