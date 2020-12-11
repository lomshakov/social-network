import style from './Profile.module.css';
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";

const Profile = (props) => {

    return (
        <div className={style.profile}>
            <div>
                <ProfileInfo />
            </div>
            <div>
                <MyPostsContainer state={props.state}/>
            </div>
        </div>
    )
}

export default Profile;