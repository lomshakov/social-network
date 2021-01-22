import style from './Profile.module.css';
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import PostsContainer from "./MyPosts/Post/PostsContainer";
import AddPostContainer from "./MyPosts/AddPostContainer";

const Profile = ({ profile, status, updateStatus, saveProfile, savePhoto, isOwner, error }) => {

    return (
        <div className={style.profile}>
            <ProfileInfo profile={profile}
                         isOwner={isOwner}
                         status={status}
                         updateStatus={updateStatus}
                         savePhoto={savePhoto}
                         saveProfile={saveProfile}
                         error={error}/>
            <AddPostContainer/>
            <PostsContainer/>
        </div>
    )
}

export default Profile;