import Post from "./Post/Post";
import style from './MyPosts.module.css';

const MyPosts = (props) => {

    let postsData = props.posts.map(post => <Post message={post.message} likesCount={post.likesCount}/>);

    return (
        <div className={style.MyPosts}>

            <div className={style.postInput}>
                <div>
                    <textarea className={style.textArea} placeholder='Напишите что-нибудь...'></textarea>
                </div>
                <div>
                    <button className={style.button}>Add post</button>
                </div>
            </div>


            <div className={style.posts}>
                {postsData}
            </div>

        </div>
    )
};

export default MyPosts;