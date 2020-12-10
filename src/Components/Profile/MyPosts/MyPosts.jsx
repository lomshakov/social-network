import Post from "./Post/Post";
import style from './MyPosts.module.css';
import * as React from "react";

const MyPosts = (props) => {

    let postsData = props.posts.map(post => <Post message={post.message} likesCount={post.likesCount}/>);

    let newPostElement = React.createRef();

    let addPost = () => {
        props.dispatch({ type: 'ADD-POST' });
        props.dispatch({ type: 'UPDATE-POST-TEXT', newText: ''});
    }

    let onPostChange = () => {
        let text = newPostElement.current.value;
        props.dispatch({ type: 'UPDATE-POST-TEXT', newText: text});
    }

    return (
        <div className={style.MyPosts}>

            <div className={style.postInput}>
                <div className={style.inputMessage}>
                    <textarea className={style.textArea}
                              placeholder='Напишите что-нибудь...'
                              ref={newPostElement}
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