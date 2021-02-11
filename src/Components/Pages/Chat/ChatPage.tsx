import React, {useEffect} from 'react'
import styles from './ChatPage.module.css'
import {Messages} from './Messages'
import {AddMessageForm} from './AddMessageForm'

export const wsChannel = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')

export type ChatMessageType = {
    message: string,
    photo: string,
    userId: number,
    userName: string
}

const ChatPage = () => {
    return (
        <div>
            <Chat/>
        </div>
    )
}

const Chat = () => {

    const addMessage = (message: string) => {
        wsChannel.send(message)
    }

    return (
        <div>
            <Messages/>
            <AddMessageForm addMessage={addMessage}/>
        </div>
    )
}

export default ChatPage