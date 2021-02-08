import React from 'react'
import style from './../Dialogs.module.css'
import {MessageType} from '../../../types/types'

type PropsType = {
    message: MessageType
}

const Message: React.FC<PropsType> = ({ message }) => {
    return (
        <div key={message.id} className={style.message}>{message.message}</div>
    )
}

export default Message