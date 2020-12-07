import style from './Dialogs.module.css';
import {NavLink} from "react-router-dom";

const DialogItem = (props) => {
    return (
        <div className={style.dialog}>
            <NavLink to={'/dialogs/' + props.id} activeClassName={style.active}>{props.name}</NavLink>
        </div>
    )
};
const Message = (props) => {
    return (
        <div className={style.message}>{props.message}</div>
    )
};

const Dialogs = (props) => {

    let dialogs = [{id: 1, name: 'Dmitry'},
        {id: 2, name: 'Alex'},
        {id: 3, name: 'Sveta'},
        {id: 4, name: 'Anna'}];

    let messages = [{id: 1, message: 'Hi!!'},
        {id: 2, message: 'Ok))'},
        {id: 3, message: 'Good Day!))'},
        {id: 4, message: 'Fuck....'}];

    let dialogsData = dialogs.map(dialog => <DialogItem name={dialog.name} id={dialog.id}/>);
    let messagesData = messages.map(message => <Message message={message.message}/>);


    return (
        <div className={style.dialogs}>
            <div className={style.dialogsItems}>
                {dialogsData}
            </div>
            <div className={style.messages}>
                {messagesData}
            </div>
        </div>
    )
};

export default Dialogs;

