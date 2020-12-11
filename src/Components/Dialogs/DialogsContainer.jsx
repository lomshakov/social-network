import * as React from "react";
import {addMessageActionCreator, updateMessageTextActionCreator} from "../../Redux/dialogs-reducer";
import Dialogs from "./Dialogs";

const DialogsContainer = (props) => {

    let state = props.store.getState();

    let addMessage = () => {
        props.store.dispatch(addMessageActionCreator());
    }

    let updateNewMessageText = (text) => {
        props.store.dispatch(updateMessageTextActionCreator(text));
    }

    return (
        <Dialogs addMessage={addMessage} updateNewMessageText={updateNewMessageText} state={state.dialogsPage}/>
    )
};

export default DialogsContainer;

