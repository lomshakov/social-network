import React, {useEffect} from 'react'
import style from './Users.module.css'
import 'antd/dist/antd.css'
import {Pagination} from 'antd'
import {User} from './User'
import {UserSearchForm} from './UserSearchForm'
import {actions, requestUsers, SearchFilterType} from '../../Redux/users-reducer'
import {useDispatch, useSelector} from 'react-redux'
import {
    getCurrentPage,
    getPageSize,
    getSearchFilter,
    getTotalUsersCount,
    getUsersSelector
} from "../../Redux/users-selectors"
import {useHistory} from 'react-router'
import * as queryString from "querystring";

type PropsType = {}

export const Users: React.FC<PropsType> = (props) => {

    const users = useSelector(getUsersSelector)
    const totalUsersCount = useSelector(getTotalUsersCount)
    const currentPage = useSelector(getCurrentPage)
    const pageSize = useSelector(getPageSize)
    const filter = useSelector(getSearchFilter)

    const history = useHistory()
    const dispatch = useDispatch()

    useEffect(() => {
        const parsed = queryString.parse(history.location.search.substr(1))

        let actualPage = currentPage
        let actualFilter = filter

        if (!!parsed.page) actualPage = Number(parsed.page)
        if (!!parsed.term) actualFilter = {...actualFilter, term: parsed.term as string}

        switch (parsed.friend) {
            case 'null':
                actualFilter = {...actualFilter, friend: null}
                break
            case 'true':
                actualFilter = {...actualFilter, friend: true}
                break
            case 'false':
                actualFilter = {...actualFilter, friend: false}
                break
        }

        dispatch(requestUsers(actualPage, pageSize, actualFilter))
    }, [])

    useEffect(() => {
        const query: any = {}
        if (!!filter.term) query.term = filter.term
        if (filter.friend !== null) query.friend = String(filter.friend)
        if (currentPage !== 1) query.page = String(currentPage)

        history.push({
            pathname: '/users',
            search: queryString.stringify(query)
        })
    }, [filter, currentPage])

    const onPageChanged = (pageNumber: number) => {
        if (pageSize != null) {
            dispatch(actions.setPageSize(pageSize))
            dispatch(requestUsers(pageNumber, pageSize, filter))
        }
        dispatch(actions.setCurrentPage(pageNumber))
    }

    const setPageSize = (current: number, size: number) => {
        dispatch(actions.setCurrentPage(current))
        dispatch(actions.setPageSize(size))
    }

    const onSearchFilterChanged = (filter: SearchFilterType) => {
        dispatch(requestUsers(1, pageSize, filter))
    }

    return (
        <div className={style.usersPage}>

            <h2>Search your friends</h2>

            <div>
                <UserSearchForm onSearchFilterChanged={onSearchFilterChanged}/>
            </div>

            <Pagination defaultCurrent={1}
                        total={totalUsersCount}
                        pageSize={pageSize}
                        onChange={onPageChanged}
                        onShowSizeChange={setPageSize}/>

            {users.map(user => <User user={user} key={user.id}/>)}
        </div>
    )
}