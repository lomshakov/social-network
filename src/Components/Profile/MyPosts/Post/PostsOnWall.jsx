import * as React from "react";
import Post from "./Post";
import style from './PostsOnWall.module.css';


const PostsOnWall = (props) => {

    let postsData = props.state.posts.map(post =>
        <Post
            message={post.message}
            likesCount={post.likesCount}
            date={post.date}
            key={post.id}/>);

    return (
        <div className={style.MyPosts}>{postsData}</div>
    )
};

export default PostsOnWall;