import Post from "./Post/Post";
import style from './MyPosts.module.css';
import * as React from "react";
import {addPostActionCreator, updatePostTextActionCreator} from "../../../Redux/profile-reducer";



const MyPosts = (props) => {

    let postsData = props.state.posts.map(post => <Post message={post.message} likesCount={post.likesCount} date={post.date}/>);

    let onAddPost = () => {
        props.addPost();
    }

    let onPostChange = (e) => {
        let text = e.target.value;
        props.updateNewPostText(text);
    }

    return (
        <div className={style.MyPosts}>
            <div className={style.postInput}>
                <div className={style.inputMessage}>
                    <textarea className={style.textArea}
                              placeholder='Напишите что-нибудь...'
                              onChange={onPostChange}
                              value={props.state.inputPostText}
                    />
                </div>
                <div className={style.buttonSubmit}>
                    <button className={style.button}
                            onClick={onAddPost}>add post
                    </button>
                </div>
            </div>


            <div className={style.posts}>
                {postsData}
            </div>

        </div>
    )
};

export default MyPosts;