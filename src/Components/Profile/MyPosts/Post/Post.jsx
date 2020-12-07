import style from './Post.module.css';

const Post = (props) => {
    return (
        <div className={style.Post}>
            <div className={style.item}>
                {props.message}
            </div>
            <div>
                Likes: {props.likesCount}
            </div>
        </div>
    );
};

export default Post;