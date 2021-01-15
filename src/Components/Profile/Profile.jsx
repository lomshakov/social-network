import style from './Profile.module.css';
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import PostsContainer from "./MyPosts/Post/PostsContainer";
import AddPostContainer from "./MyPosts/AddPostContainer";

const Profile = ({ profile, status, updateStatus }) => {

    return (
        <div className={style.profile}>
            <ProfileInfo profile={profile}
                         status={status}
                         updateStatus={updateStatus}/>
            <AddPostContainer/>
            <PostsContainer/>
        </div>
    )
}

export default Profile;