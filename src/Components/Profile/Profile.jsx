import style from './Profile.module.css';
import MyPosts from "./MyPosts/MyPosts";
import ProfileInfo from "./ProfileInfo/ProfileInfo";

const Profile = (props) => {

    return (
        <div className={style.profile}>
            <div>
                <ProfileInfo />
            </div>
            <div>
                <MyPosts posts={props.state.posts}
                         dispatch={props.dispatch}
                         newPostText={props.state.inputPostText}/>
            </div>
        </div>
    )
}

export default Profile;