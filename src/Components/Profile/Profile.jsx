import style from './Profile.module.css';
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import PostsContainer from "./MyPosts/Post/PostsContainer";
import AddPostWallContainer from "./MyPosts/AddPostWallContainer";

const Profile = (props) => {

    return (
        <div className={style.profile}>
            <ProfileInfo profile={props.profile}
                         status={props.status}
                         updateStatus={props.updateStatus}/>
            <AddPostWallContainer/>
            <PostsContainer/>
        </div>
    )
}

export default Profile;