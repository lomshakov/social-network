import Post from "./Post/Post";
import style from './MyPosts.module.css';

const MyPosts = () => {

    let posts = [{id: 1, message: 'Hi to all!!!', likesCount: 15},
        {id: 2, message: 'Hello World', likesCount: 7},
        {id: 3, message: 'This is network', likesCount: 84},
        {id: 4, message: 'Fuck....uuu', likesCount: 11}];

    let postsData = posts.map(post => <Post message={post.message} likesCount={post.likesCount}/>);

    return (
        <div className={style.MyPosts}>
            <h3>My posts</h3>
            <div>
                <div>
                    <textarea></textarea>
                </div>
                <div>
                    <button>Add post</button>
                </div>
            </div>
            <div className={style.posts}>
                {postsData}
            </div>

        </div>
    )
};

export default MyPosts;