import style from './Dialogs.module.css';
import {NavLink} from "react-router-dom";
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import * as React from "react";

const Dialogs = (props) => {

    let dialogsData = props.state.dialogs.map(dialog => <DialogItem name={dialog.name} id={dialog.id}/>);
    let messagesData = props.state.messages.map(message => <Message message={message.message}/>);

    let newMessageElement = React.createRef();

    let addMessage = () => {
        props.dispatch({ type: 'ADD-MESSAGE' });
        props.dispatch({ type: 'UPDATE-MESSAGE-TEXT', newText: ''});
    }

    let onMessageChange = () => {
        let text = newMessageElement.current.value;
        props.dispatch({ type: 'UPDATE-MESSAGE-TEXT', newText: text});
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
                              ref={newMessageElement}
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

