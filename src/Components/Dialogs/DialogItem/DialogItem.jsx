import style from "./../Dialogs.module.css";
import {NavLink} from "react-router-dom";

const DialogItem = (props) => {

    let path = `/dialogs/${props.id}`;

    return (
        <div className={style.dialogsItems}>
            <NavLink to={path} activeClassName={style.active}>{props.name}</NavLink>
        </div>
    )
};

export default DialogItem;

