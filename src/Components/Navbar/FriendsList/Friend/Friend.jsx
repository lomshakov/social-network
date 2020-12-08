import style from './../FriendsList.module.css';

const Friend = (props) => {


    return (
        <div className={style.friendList}>
            <div>
                <img src={props.avatarUrl} />
            </div>
            <div className={style.name}>
                {props.name}
            </div>
        </div>
    )
};

export default Friend;