import style from './../Profile.module.css'
import Preloader from "../../common/Preloader/Preloader";
import userPhoto from "../../../assets/images/user.png";

const ProfileInfo = (props) => {

    if (!props.profile) {
        return <Preloader/>
    }

    return (
        <div className={style.profileInfo}>
            <div className={style.avatar}>
                <img src={props.profile.photos.large}/>
            </div>
            <div className={style.profileDescription}>
                <h4 className={style.name}>{props.profile.fullName}</h4>
                <div>{props.profile.aboutMe}</div>
                <div>Работа: {props.profile.lookingForAJob === false ? "нуждаюсь" : "не нуждаюсь"}</div>
                <div>О работе: {props.profile.lookingForAJobDescription}</div>
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