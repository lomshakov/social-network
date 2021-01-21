import {
    follow,
    setCurrentPage,
    unfollow,
    toggleIsFollowing,
    requestUsers,
    setPageSize
} from "../../Redux/users-reducer";
import {connect} from "react-redux";
import Users from "./Users";
import * as React from "react";
import Preloader from "../common/Preloader/Preloader.js";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";
import {
    getCurrentPage,
    getFollowingInProgress,
    getIsFetching,
    getPageSize,
    getTotalUsersCount,
    getUsersSelector,
    getUsersSuperSelector
} from "../../Redux/users-selectors";

class UsersContainer extends React.Component{

    componentDidMount() {
        this.props.requestUsers(this.props.currentPage, this.props.pageSize);
    };

    onPageChanged = (pageNumber, pageSize) => {
        this.props.setPageSize(pageSize)
        this.props.requestUsers(pageNumber, pageSize);
        this.props.setCurrentPage(pageNumber);
    };

    setPageSize = (current, size) => {
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
               currentPage={this.props.currentPage}
               onPageChanged={this.onPageChanged}
               users={this.props.users}
               follow={this.props.follow}
               unfollow={this.props.unfollow}
               followingInProgress={this.props.followingInProgress}
               setPageSize={this.setPageSize}/>
        </>
    }
}

let mapStateToProps = (state) => {
    return {
        //users: getUsersSelector(state),
        users: getUsersSuperSelector(state),
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
)(UsersContainer);