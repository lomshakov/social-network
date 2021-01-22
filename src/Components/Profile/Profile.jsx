import style from './Profile.module.css';
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import PostsContainer from "./MyPosts/Post/PostsContainer";
import AddPostContainer from "./MyPosts/AddPostContainer";

const Profile = ({ profile, status, updateStatus, isAuth, savePhoto, isOwner }) => {

    return (
        <div className={style.profile}>
            <ProfileInfo profile={profile}
                         isOwner={isOwner}
                         status={status}
                         updateStatus={updateStatus}
                         isAuth={isAuth}
                         savePhoto={savePhoto}/>
            <AddPostContainer/>
            <PostsContainer/>
        </div>
    )
}

export default Profile;