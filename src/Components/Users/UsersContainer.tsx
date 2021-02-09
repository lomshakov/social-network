import React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import Users from './Users'
import Preloader from '../common/Preloader/Preloader'
import {
    actions,
    follow,
    unfollow,
    requestUsers, SearchFilterType
} from '../../Redux/users-reducer'
import {withAuthRedirect} from '../../hoc/withAuthRedirect'
import {
    getCurrentPage,
    getFollowingInProgress,
    getIsFetching,
    getPageSize, getSearchFilter,
    getTotalUsersCount,
    getUsersSelector
} from '../../Redux/users-selectors'
import { UsersType } from '../../types/types'
import { AppStateType } from '../../Redux/redux-store'

const {setCurrentPage, toggleIsFollowing, setPageSize} = actions

type MapStateToPropsType = {
    pageSize: number
    currentPage: number
    totalUsersCount: number
    isFetching: boolean
    users: Array<UsersType>
    followingInProgress: Array<number>
    filter: SearchFilterType
}

type MapDispatchToPropsType = {
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    requestUsers: (currentPage: number, pageSize: number, filter: SearchFilterType) => void
    onPageChanged: (pageNumber: number, pageSize?: number) => void
    setPageSize: (pageSize: number) => void
    setCurrentPage: (pageNumber: number) => void
}

class UsersContainer extends React.Component<MapStateToPropsType & MapDispatchToPropsType> {

    componentDidMount() {
        console.log(this.props)
        debugger
        const {currentPage, pageSize, filter} = this.props
        this.props.requestUsers(currentPage, pageSize, filter)
    }

    onPageChanged = (pageNumber: number, pageSize?: number) => {
        if (pageSize != null) {
            this.props.setPageSize(pageSize)
            const {filter} = this.props
            this.props.requestUsers(pageNumber, pageSize, filter)
        }
        this.props.setCurrentPage(pageNumber)
    }

    setPageSize = (current: number, size: number) => {
        this.props.setCurrentPage(current)
        this.props.setPageSize(size)
    }

    onSearchFilterChanged = (filter: SearchFilterType) => {

        const {pageSize} = this.props
        this.props.requestUsers(1, pageSize, filter)
    }

    render() {
        return <>
        {this.props.isFetching
            ? <Preloader />
            : null}
        <Users totalUsersCount={this.props.totalUsersCount}
               pageSize={this.props.pageSize}
               onPageChanged={this.onPageChanged}
               users={this.props.users}
               follow={this.props.follow}
               unfollow={this.props.unfollow}
               followingInProgress={this.props.followingInProgress}
               onSearchFilterChanged={this.onSearchFilterChanged}
               setPageSize={this.setPageSize}/>
        </>
    }
}

let mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        users: getUsersSelector(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state),
        filter: getSearchFilter(state)
    }
}

export default compose<React.ComponentType>(
    connect(mapStateToProps, {
        follow,
        unfollow,
        setCurrentPage,
        toggleIsFollowing,
        requestUsers,
        setPageSize
    }),
    withAuthRedirect
)(UsersContainer)