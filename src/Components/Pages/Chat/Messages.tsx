import React, {useEffect, useRef, useState} from 'react'
import styles from './ChatPage.module.css'
import {useSelector} from 'react-redux'
import {AppStateType} from '../../../Redux/redux-store'
import {ChatMessageAPIType} from '../../../api/chat-api'
import {ChatMessageType} from '../../../Redux/chat-reducer'

export const Messages: React.FC = () => {

    const messages = useSelector((state: AppStateType) => state.chat.messages)
    const messagesAnchorRef = useRef<HTMLDivElement>(null)
    const [autoScroll, setAutoScroll] = useState(false)

    const scrollHandler = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
        const element = e.currentTarget
        if (Math.abs(element.scrollHeight - element.scrollTop - element.clientHeight) < 300) {
            console.log('Scrolled to element!')
            !autoScroll && setAutoScroll(true)
        } else {
            autoScroll && setAutoScroll(false)
        }
    }

    useEffect(() => {
        if (autoScroll) {
            messagesAnchorRef.current?.scrollIntoView({behavior: "smooth"})
        }
    }, [messages])

    return (
        <div className={styles.chat__wrapper} onScroll={scrollHandler}>
            {messages.map((m: ChatMessageType, index) => <Message key={m.id} message={m}/>)}
            <div ref={messagesAnchorRef}></div>
        </div>
    )
}

type MessagePropsType = {
    message: ChatMessageAPIType
}

const Message: React.FC<MessagePropsType> = React.memo(({message}) => {

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
})