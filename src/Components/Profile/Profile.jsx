import style from './Profile.module.css';
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import PostsOnWallContainer from "./MyPosts/Post/PostsOnWallContainer";
import AddPostWallContainer from "./MyPosts/AddPostWallContainer";

const Profile = (props) => {

    return (
        <div className={style.profile}>
            <div>
                <ProfileInfo profile={props.profile}/>
            </div>
            <div>
                <AddPostWallContainer state={props.state}/>
            </div>
            <div>
                <PostsOnWallContainer state={props.state}/>
            </div>
        </div>
    )
}

export default Profile;