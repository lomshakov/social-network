import * as React from "react";
import {addMessageActionCreator, updateMessageTextActionCreator} from "../../Redux/dialogs-reducer";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";

let mapStateToProps = (state) => {
    return {
        state: state.dialogsPage
    }
};

let mapDispatchToProps = (dispatch) => {
    return {
        updateNewMessageText: (text) => dispatch(updateMessageTextActionCreator(text)),
        addMessage: () => dispatch(addMessageActionCreator())
    }
};

const DialogsContainer = connect (mapStateToProps, mapDispatchToProps)(Dialogs);

export default DialogsContainer;

