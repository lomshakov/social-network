import style from './Users.module.css';

const Users = (props) => {

    return (
        <div className={style.usersPage}>
            {
                props.state.users.map(u =>
                    <div className={style.users} key={u.id}>
                        <div className={style.usersAvatar}>
                            <div>
                                <img src={u.avatarUrl} />
                            </div>
                            <div>
                                { u.followed
                                    ? <button onClick={ () => props.unfollow(u.id) }>Unfollow</button>
                                    : <button onClick={ () => props.follow(u.id) }>Follow</button>
                                }
                            </div>
                        </div>
                        <div className={style.usersInfo}>
                            <div>{u.fullName}</div>
                            <div>{u.status}</div>
                            <div>{u.location.country}</div>
                            <div>{u.location.city}</div>
                        </div>
                    </div>)
            }
        </div>
    )
}

export default Users;