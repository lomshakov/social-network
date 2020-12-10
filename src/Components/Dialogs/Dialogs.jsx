import style from './Dialogs.module.css';
import {NavLink} from "react-router-dom";
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import * as React from "react";
import {addMessageActionCreator, updateMessageTextActionCreator} from "../../Redux/dialogs-reducer";

const Dialogs = (props) => {

    let dialogsData = props.state.dialogs.map(dialog => <DialogItem name={dialog.name} id={dialog.id}/>);
    let messagesData = props.state.messages.map(message => <Message message={message.message}/>);

    let addMessage = () => {
        props.dispatch(addMessageActionCreator());
    }

    let onMessageChange = (e) => {
        let text = e.target.value;
        props.dispatch(updateMessageTextActionCreator(text));
    }

    return (
        <div className={style.dialogs}>
            <div className={style.dialogsRow}>
                <div className={style.dialog}>
                    {dialogsData}
                </div>
                <div className={style.messages}>
                    {messagesData}
                </div>
            </div>
            <div className={style.submitRow}>
                <div className={style.textArea}>
                    <textarea className={style.textArea}
                              placeholder='Напишите сообщение...'
                              onChange={onMessageChange}
                              value={props.state.inputMessageText} />
                </div>
                <div className={style.buttonArea}>
                    <button className={style.button}
                            onClick={addMessage}>add post
                    </button>
                </div>
            </div>

        </div>
    )
};

export default Dialogs;

