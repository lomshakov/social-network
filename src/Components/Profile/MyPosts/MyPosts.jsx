import Post from "./Post/Post";
import style from './MyPosts.module.css';
import * as React from "react";
import {addPostActionCreator, updatePostTextActionCreator} from "../../../Redux/profile-reducer";



const MyPosts = (props) => {

    let postsData = props.posts.map(post => <Post message={post.message} likesCount={post.likesCount} date={post.date}/>);

    let addPost = () => {
        props.dispatch(addPostActionCreator());
    }

    let onPostChange = (e) => {
        let text = e.target.value;
        props.dispatch(updatePostTextActionCreator(text));
    }

    return (
        <div className={style.MyPosts}>

            <div className={style.postInput}>
                <div className={style.inputMessage}>
                    <textarea className={style.textArea}
                              placeholder='Напишите что-нибудь...'
                              onChange={onPostChange}
                              value={props.newPostText}
                    />
                </div>
                <div className={style.buttonSubmit}>
                    <button className={style.button}
                            onClick={addPost}>add post
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