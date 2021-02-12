import React, {useEffect} from 'react'
import {Messages} from './Messages'
import {AddMessageForm} from './AddMessageForm'
import {useDispatch} from 'react-redux'
import {startChat, stopChat} from '../../../Redux/chat-reducer'

const ChatPage = () => {
    return (
        <div>
            <Chat/>
        </div>
    )
}

const Chat = () => {

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(startChat())
        return () => {
            dispatch(stopChat())
        }
    }, [])


    return (
        <div>
            <Messages/>
            <AddMessageForm/>
        </div>
    )
}

export default ChatPage