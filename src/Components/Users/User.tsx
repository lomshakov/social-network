import React from 'react'
import style from './Users.module.css'
import 'antd/dist/antd.css'
import userPhoto from '../../assets/images/user.png'
import {NavLink} from 'react-router-dom'
import {UsersType} from '../../types/types'
import {Button} from "antd"
import {useDispatch, useSelector} from "react-redux"
import {follow, unfollow} from "../../Redux/users-reducer"
import {getFollowingInProgress} from "../../Redux/users-selectors"

type PropsType = {
    user: UsersType
}

export const User: React.FC<PropsType> = ({user}) => {

    const followingInProgress = useSelector(getFollowingInProgress)

    const dispatch = useDispatch()
    const followUser = (userId: number) => dispatch(follow(userId))
    const unfollowUser = (userId: number) => dispatch(unfollow(userId))

    return (
        <div className={style.users}>
            <div className={style.usersAvatar}>
                <div>
                    <NavLink to={"/profile/" + user.id}>
                        <img alt='User avatar' src={user.photos.small != null ? user.photos.small : userPhoto}/>
                    </NavLink>
                </div>
                <div>

                    {user.followed ? <Button danger
                                             disabled={followingInProgress.some(id => id === user.id)}
                                             onClick={() => unfollowUser(user.id)}
                        >Unfollow</Button>
                        : <Button disabled={followingInProgress.some(id => id === user.id)}
                                  onClick={() => followUser(user.id)}
                        >Follow</Button>}

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