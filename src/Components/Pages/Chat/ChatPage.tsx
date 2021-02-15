import React, {useEffect} from 'react'
import {Messages} from './Messages'
import {AddMessageForm} from './AddMessageForm'
import {useDispatch, useSelector} from 'react-redux'
import {startChat, stopChat} from '../../../Redux/chat-reducer'
import {AppStateType} from '../../../Redux/redux-store'

const ChatPage = () => {
    return (
        <div>
            <Chat/>
        </div>
    )
}

const Chat = () => {

    const status = useSelector((state: AppStateType) => state.chat.status)

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(startChat())
        return () => {
            dispatch(stopChat())
        }
    }, [])


    return (
        <div>
            {status === 'error' && <div>Error with opening WebSocket connection. Please, refresh page</div>}
            <Messages/>
            <AddMessageForm/>
        </div>
    )
}

export default ChatPage