import React, {useEffect, useState} from 'react'
import styles from './ChatPage.module.css'
import {ChatMessageType, wsChannel} from './ChatPage'

export const Messages: React.FC = () => {
    debugger

    const [messages, setMessages] = useState<ChatMessageType[]>([])

    useEffect(() => {
        wsChannel.addEventListener('message', (e) => {
            // console.log(e)
            let newMessages = JSON.parse(e.data)
            setMessages(prevMessages => [...prevMessages, ...newMessages])
        })
    }, [messages])

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