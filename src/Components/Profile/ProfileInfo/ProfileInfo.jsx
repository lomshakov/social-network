import React, {useState} from 'react';
import style from './../Profile.module.css';
import 'antd/dist/antd.css';
import {Upload, message, Button, Input} from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import Preloader from '../../common/Preloader/Preloader';
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import userPhoto from "../../../assets/images/user.png";
import ButtonUpload from "../../common/Button/ButtonUpload";
import ProfileDataEdit from "./ProfileDataEdit";

const ProfileInfo = ({ profile, isOwner, status, updateStatus, savePhoto, saveProfile, error }) => {

    let [editMode, setEditMode] = useState(false)

    if (!profile) {
        return <Preloader/>
    }

    const onChange = (e) => {
        if (e.target.files.length) {
            savePhoto(e.target.files[0])
        }
    }

    const handleSubmit = async (values: any) => {
        await saveProfile(values)
        setEditMode(false)
        if (error !== '') message.error(error)
    };

    return (
        <div className={style.profileInfo}>
            <div className={style.avatar}>
                <img src={profile.photos.large || userPhoto}/>
                {isOwner && <Input type={'file'} onChange={onChange}/>}
            </div>
            {editMode ? <ProfileDataEdit profile={profile} handleSubmit={handleSubmit}
                                         error={error} deactivateEditMode={() => setEditMode(false)}/>
                      : <ProfileData profile={profile} status={status} updateStatus={updateStatus}
                                     isOwner={isOwner} error={error} activateEditMode={() => setEditMode(true)}/>}


        </div>
    )
}

const ProfileData = ({ profile, status, updateStatus, isOwner, activateEditMode, error }) => {

    return (
        <div className={style.profileDescription}>

            {isOwner && <Button type='default' onClick={activateEditMode}>Edit</Button>}
            <h3 className={style.name}>{profile.fullName}</h3>
            <ProfileStatusWithHooks status={status}
                                    updateStatus={updateStatus} />
            <div>Looking for a job: {profile.lookingForAJob ? "yes" : "no"}</div>
            {profile.lookingForAJob && <div>My skills: {profile.lookingForAJobDescription}</div>}
            <div>About me: {profile.aboutMe}</div>
            <div>
                Contacts:

                {Object.keys(profile.contacts).map(key => {
                    return <Contact key={key} contactTitle={key} contactValue={profile.contacts[key]}/>
                })}

            </div>
        </div>
    )
}

const Contact = ({ contactTitle, contactValue }) => {
    return contactValue && <div>{contactTitle}: {contactValue}</div>
}

export default ProfileInfo