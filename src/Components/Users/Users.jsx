import style from "./Users.module.css";
import userPhoto from "../../assets/images/user.png";

let Users = (props) => {

    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);

    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }

    return (
        <div className={style.usersPage}>
            <div>

                {
                    pages.map(p => {
                        return <span className={props.currentPage === p ? style.selectedPage : style.pageNumber}
                                     onClick={ () => { props.onPageChanged(p) } }>{p} </span>
                    })
                }


            </div>
            {
                props.users.map(u =>
                    <div className={style.users} key={u.id}>
                        <div className={style.usersAvatar}>
                            <div>
                                <img src={u.photos.small != null ? u.photos.small : userPhoto} />
                            </div>
                            <div>
                                { u.followed
                                    ? <button onClick={ () => props.unfollow(u.id) }>Unfollow</button>
                                    : <button onClick={ () => props.follow(u.id) }>Follow</button>
                                }
                            </div>
                        </div>
                        <div className={style.usersInfo}>
                            <div>{u.name}</div>
                            <div>{u.status}</div>
                            <div>{"u.location.country"}</div>
                            <div>{"u.location.city"}</div>
                        </div>
                    </div>)
            }
        </div>
    )
}

export default Users;