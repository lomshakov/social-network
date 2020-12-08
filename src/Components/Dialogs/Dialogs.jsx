import style from './Dialogs.module.css';
import {NavLink} from "react-router-dom";
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";

const Dialogs = (props) => {

    // Из массивов с данными получаем массивы с jsx разметкой, которые потом возвращаем
    // ниже, используя просто массив - при этом вернутся все элементы массива
    let dialogsData = props.state.dialogs.map(dialog => <DialogItem name={dialog.name} id={dialog.id}/>);
    let messagesData = props.state.messages.map(message => <Message message={message.message}/>);


    return (
        <div className={style.dialogs}>
            <div className={style.dialog}>
                {dialogsData}
            </div>
            <div className={style.messages}>
                {messagesData}
            </div>
        </div>
    )
};

export default Dialogs;

