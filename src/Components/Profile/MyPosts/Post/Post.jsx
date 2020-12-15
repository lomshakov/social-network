import style from './Post.module.css';


const Post = (props) => {
    return (
        <div className={style.Post}>

            <div className={style.item}>
                <div className={style.item}>
                    {props.message}
                </div>
            </div>

            <div className={style.itemData}>
                <div>
                </div>
                <div className={style.date}>
                    {props.date}
                </div>
                <div className={style.like}>
                    Likes: {props.likesCount}
                </div>
            </div>

        </div>
    );
};

export default Post;