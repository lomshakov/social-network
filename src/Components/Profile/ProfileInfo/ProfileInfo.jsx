import style from './../Profile.module.css';
import 'antd/dist/antd.css';
import {Upload, message, Button, Input} from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import Preloader from '../../common/Preloader/Preloader';
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import userPhoto from "../../../assets/images/user.png";
import ButtonUpload from "../../common/Button/ButtonUpload";

const ProfileInfo = (props) => {

    if (!props.profile) {
        return <Preloader/>
    }

    const onChange = (e) => {

        if (e.target.files.length) {
            props.savePhoto(e.target.files[0])
        }

/*        if (file.status !== 'uploading') {
            //console.log(info.file, info.fileList);
        }
        if (file.status === 'done') {
            message.success(`${file.name} file uploaded successfully`);
        } else if (file.status === 'error') {
            message.error(`${file.name} file upload failed.`);
        }*/
    }

    return (
        <div className={style.profileInfo}>
            <div className={style.avatar}>
                <img src={props.profile.photos.large || userPhoto}/>

                {/*{props.isAuth && <ButtonUpload onChange={onChange}/>}*/}
                {props.isOwner && <Input type={'file'} onChange={onChange}/>}

            </div>
            <div className={style.profileDescription}>
                <h4 className={style.name}>{props.profile.fullName}</h4>
                <ProfileStatusWithHooks status={props.status}
                                        updateStatus={props.updateStatus} />

                {/*<div>{props.profile.aboutMe}</div>*/}
                <div>Looking for a job: {props.profile.lookingForAJob === false ? "yes" : "no"}</div>
                <div>Skills: {props.profile.lookingForAJobDescription}</div>
                <div>
                    Contacts:
                    <div>
                        {
                            props.profile.contacts.facebook
                                ? <a href={props.profile.contacts.facebook} target="_blank">Facebook</a>
                                : null
                        }
                    </div>

                    <div>
                        {
                            props.profile.contacts.website
                                ? <a href={props.profile.contacts.website} target="_blank">website</a>
                                : null
                        }
                    </div>

                    <div>
                        {
                            props.profile.contacts.vk
                                ? <a href={props.profile.contacts.vk} target="_blank">vk</a>
                                : null
                        }
                    </div>

                    <div>
                        {
                            props.profile.contacts.twitter
                                ? <a href={props.profile.contacts.twitter} target="_blank">twitter</a>
                                : null
                        }
                    </div>

                    <div>
                        {
                            props.profile.contacts.instagram
                                ? <a href={props.profile.contacts.instagram} target="_blank">instagram</a>
                                : null
                        }
                    </div>

                    <div>
                        {
                            props.profile.contacts.youtube
                                ? <a href={props.profile.contacts.youtube} target="_blank">youtube</a>
                                : null
                        }
                    </div>

                    <div>
                        {
                            props.profile.contacts.github
                                ? <a href={props.profile.contacts.github} target="_blank">github</a>
                                : null
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfileInfo;