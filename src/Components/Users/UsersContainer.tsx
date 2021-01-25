import React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import Users from './Users'
import Preloader from '../common/Preloader/Preloader.js'
import {
    follow,
    setCurrentPage,
    unfollow,
    toggleIsFollowing,
    requestUsers,
    setPageSize
} from '../../Redux/users-reducer'
import {withAuthRedirect} from '../../hoc/withAuthRedirect'
import {
    getCurrentPage,
    getFollowingInProgress,
    getIsFetching,
    getPageSize,
    getTotalUsersCount,
    getUsersSelector
} from '../../Redux/users-selectors'
import { UsersType } from '../../types/types'
import { AppStateType } from '../../Redux/redux-store'

type mapStateToPropsType = {
    pageSize: number
    currentPage: number
    totalUsersCount: number
    isFetching: boolean
    users: Array<UsersType>
    followingInProgress: Array<number>
}

type mapDispatchToPropsType = {
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    requestUsers: (currentPage: number, pageSize: number) => void
    onPageChanged: (pageNumber: number, pageSize?: number) => void
    setPageSize: (pageSize: number) => void
    setCurrentPage: (pageNumber: number) => void
}

type PropsType = mapStateToPropsType & mapDispatchToPropsType

class UsersContainer extends React.Component<PropsType> {

    componentDidMount() {
        this.props.requestUsers(this.props.currentPage, this.props.pageSize)
    }

    onPageChanged = (pageNumber: number, pageSize?: number) => {
        if (pageSize != null) {
            this.props.setPageSize(pageSize)
            this.props.requestUsers(pageNumber, pageSize)
        }
        this.props.setCurrentPage(pageNumber)
    }

    setPageSize = (current: number, size: number) => {
        this.props.setCurrentPage(current)
        this.props.setPageSize(size)
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
               setPageSize={this.setPageSize}/>
        </>
    }
}

let mapStateToProps = (state: AppStateType): mapStateToPropsType => {
    return {
        users: getUsersSelector(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state)
    }
}

export default compose(
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