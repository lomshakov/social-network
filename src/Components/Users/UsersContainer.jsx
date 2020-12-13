import {followAC, setUsersAC, unfollowAC} from "../../Redux/users-reducer";
import {connect} from "react-redux";
import Users from "./Users";

let mapStateToProps = (state) => {

    return {
        state: state.usersPage
    }
};

let mapDispatchToProps = (dispatch) => {
    return {
        follow: (userId) => {dispatch(followAC(userId))},
        unfollow: (userId) => {dispatch(unfollowAC(userId))},
        setUsers: (users) => {dispatch(setUsersAC(users))}
    }
}

let UsersContainer = connect(mapStateToProps, mapDispatchToProps)(Users);

export default UsersContainer;