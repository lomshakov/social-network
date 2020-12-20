import Header from "./Header";
import * as React from "react";
import * as axios from "axios";
import {connect} from "react-redux";
import {setAuthUserData} from "../../Redux/auth-reducer";


class HeaderContainer extends React.Component {

    componentDidMount() {
        axios.get(`https://social-network.samuraijs.com/api/1.0/auth/me`, {withCredentials: true})
            .then(response => {
                if (response.data.resultCode === 0) {

                    let {id, email, login} = response.data.data; // здесь должно быть как в API - id а не userId
                    this.props.setAuthUserData(id, email, login);

                }
            });
    }

    render() {
        return <Header {...this.props} />
    }
}

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login,

});


export default connect(mapStateToProps, {setAuthUserData})(HeaderContainer);