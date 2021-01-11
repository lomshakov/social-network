import * as React from "react";
import Profile from "./Profile";
import {connect} from "react-redux";
import {getProfileData, getUserStatus, updateStatus} from "../../Redux/profile-reducer";
import {withRouter} from 'react-router-dom';
import {compose} from "redux";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";

class ProfileContainer extends React.Component {

    componentDidMount() {
        let userId = this.props.match.params.userId;

        if (!userId) {
            userId = this.props.authorizedUserId
        }

        this.props.getProfileData(userId);
        this.props.getUserStatus(userId);
    }

    render() {
        return <Profile {...this.props}
                        profile={this.props.profile}
                        status={this.props.status}
                        updateStatus={this.props.updateStatus} />
    }
}

let mapStateToProps = (state) => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    authorizedUserId: state.auth.userId,
    isAuth: state.auth.isAuth
});

export default compose(
    connect(mapStateToProps, {getProfileData, getUserStatus, updateStatus}),
    withRouter,
    withAuthRedirect
)(ProfileContainer);