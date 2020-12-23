import Header from "./Header";
import * as React from "react";
import {connect} from "react-redux";
import {setAuth} from "../../Redux/auth-reducer";


class HeaderContainer extends React.Component {

    componentDidMount() {
        this.props.setAuth();
    }

    render() {
        return <Header {...this.props} />
    }
}

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login,

});


export default connect(mapStateToProps, {setAuth})(HeaderContainer);