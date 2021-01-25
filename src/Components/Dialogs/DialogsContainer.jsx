import {addMessage} from "../../Redux/dialogs-reducer";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";
import {withRouter} from "react-router-dom";
import * as React from "react";
import Preloader from "../common/Preloader/Preloader";
import Users from "../Users/Users";

class DialogsContainer extends React.Component{

    componentDidMount() {

    };


    render() {
        return <>
            {this.props.isFetching
                ? <Preloader />
                : null}
            <Dialogs dialogsPage={this.props.dialogsPage}
                     addMessage={this.props.addMessageActionCreator}
                     isAuth={this.props.isAuth}/>
        </>
    }
}

let mapStateToProps = (state) => {
    return {
        dialogsPage: state.dialogsPage,
        isAuth: state.auth.isAuth
    }
};

// let mapDispatchToProps = (dispatch) => {
//     return {
//         addMessage: (message) => dispatch(addMessageActionCreator(message))
//     }
// };

export default compose(
    connect(mapStateToProps, {addMessageActionCreator: addMessage}),
    withAuthRedirect
)(DialogsContainer);


