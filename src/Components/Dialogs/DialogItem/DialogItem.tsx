import React from 'react'
import style from './../Dialogs.module.css'
import {NavLink} from 'react-router-dom'

type PropsType = {
    id: number
    name: string
}

const DialogItem: React.FC<PropsType> = ({ id, name }) => {

    let path = `/dialogs/${id}`

    return (
        <div className={style.dialogsItems}>
            <NavLink to={path} activeClassName={style.active}>{name}</NavLink>
        </div>
    )
}

export default DialogItem

