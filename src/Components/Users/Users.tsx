import React from 'react'
import style from './Users.module.css'
import 'antd/dist/antd.css'
import {Pagination} from 'antd'
import User from './User'
import {UsersType} from '../../types/types'
import UserSearchForm from './UserSearchForm'
import {SearchFilterType} from '../../Redux/users-reducer'

type PropsType = {
    totalUsersCount: number
    pageSize: number
    onPageChanged: (pageNumber: number, pageSize?: number) => void
    users: Array<UsersType>
    followingInProgress: Array<number>
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    setPageSize: (current: number, size: number) => void
    onSearchFilterChanged: (filter: SearchFilterType) => void
}

const Users: React.FC<PropsType> = ({
                                        totalUsersCount,
                                        pageSize,
                                        onPageChanged,
                                        users,
                                        followingInProgress,
                                        follow,
                                        unfollow,
                                        setPageSize,
                                        onSearchFilterChanged
                                    }) => {
    return (

        <div className={style.usersPage}>

            <div>
                <UserSearchForm onSearchFilterChanged={onSearchFilterChanged}/>
            </div>

            <Pagination defaultCurrent={1}
                        total={totalUsersCount}
                        pageSize={pageSize}
                        onChange={onPageChanged}
                        onShowSizeChange={setPageSize}/>

            {users.map(user => <User followingInProgress={followingInProgress}
                                     follow={follow}
                                     unfollow={unfollow}
                                     user={user}
                                     key={user.id}/>)}
        </div>
    )
}



export default Users