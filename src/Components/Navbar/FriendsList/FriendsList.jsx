import style from './FriendsList.module.css';
import Friend from "./Friend/Friend";

const FriendsList = (props) => {



    let friends = props.friends.map(f => <Friend name={f.name} avatarUrl={f.avatarUrl}/>)

    return (
        <div>
            {friends}
        </div>
    )
};

export default FriendsList;