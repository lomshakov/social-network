import React from 'react'
import styles from './ChatPage.module.css'
import {useSelector} from 'react-redux'
import {AppStateType} from '../../../Redux/redux-store'
import {ChatMessageType} from '../../../api/chat-api'

export const Messages: React.FC = () => {

    const messages = useSelector((state: AppStateType) => state.chat.messages)

    return (
        <div className={styles.chat__wrapper}>
            {messages.map((m: ChatMessageType, index) => <Message key={index} message={m}/>)}
        </div>
    )
}

type MessagePropsType = {
    message: ChatMessageType
}

const Message: React.FC<MessagePropsType> = ({message}) => {

    return (
        <div>
            <div className={styles.message}>
                <div>
                    <img className={styles.author__avatar} src={message.photo} alt="avatar"/>
                </div>
                <div>
                    <strong>{message.userName}</strong>
                    <div>
                        {message.message}
                    </div>

                </div>

            </div>
        </div>
    )
}