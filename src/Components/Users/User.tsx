import React from 'react'
import style from './Users.module.css'
import 'antd/dist/antd.css'
import userPhoto from '../../assets/images/user.png'
import {NavLink} from 'react-router-dom'
import {UsersType} from '../../types/types'
import {Button} from "antd";

type PropsType = {
    followingInProgress: Array<number>
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    user: UsersType
}

let User: React.FC<PropsType> = ({ followingInProgress,
                                     follow,
                                     unfollow,
                                     user }) => {

    return (
        <div className={style.users}>
            <div className={style.usersAvatar}>
                <div>
                    <NavLink to={"/profile/" + user.id}>
                        <img alt='User avatar' src={user.photos.small != null ? user.photos.small : userPhoto}/>
                    </NavLink>
                </div>
                <div>

                    { user.followed ? <Button danger
                                              disabled={followingInProgress.some(id => id === user.id)}
                                              onClick={() => unfollow(user.id)}
                                      >Unfollow</Button>
                                    : <Button type="primary"
                                             disabled={followingInProgress.some(id => id === user.id)}
                                             onClick={() => follow(user.id)}
                                     >Follow</Button> }

                    {/*{user.followed
                        ? <button disabled={followingInProgress.some(id => id === user.id)}
                                  className={style.buttonUnfollow}
                                  onClick={() => unfollow(user.id)}>Unfollow</button>
                        : <button disabled={followingInProgress.some(id => id === user.id)}
                                  className={style.buttonFollow}
                                  onClick={() => {
                                      follow(user.id)
                                  }}>Follow</button>
                    }*/}
                </div>
            </div>
            <div className={style.usersInfo}>
                <div>{user.name}</div>
                <div>{user.status}</div>
                <div>{"u.location.country"}</div>
                <div>{"u.location.city"}</div>
            </div>
        </div>
    )
}

export default User