import React, {useEffect, useState} from 'react'
import styles from './ChatPage.module.css'
import {Field, Form, Formik} from "formik"
import {AntInput} from "../../common/FormsControls/CreateAntFields"
import {Button} from "antd"
import {SendOutlined} from "@ant-design/icons"

export type ChatMessageType = {
    message: string,
    photo: string,
    userId: number,
    userName: string
}

const ChatPage2 = () => {
    return (
        <div>
            <Chat/>
        </div>
    )
}

const Chat = () => {

    const [wsChannel, setWsChannel] = useState<WebSocket | null>(null)


    useEffect(() => {
        let ws: WebSocket
        const closeHandler = () => {
            console.log('ERROR: close websocket')
            setTimeout(createWSSChannel, 3000)
        }

        function createWSSChannel() {
            ws?.removeEventListener('close', closeHandler)
            ws?.close()
            ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')
            ws.addEventListener('close', closeHandler)
            setWsChannel(ws)
        }

        createWSSChannel()
    }, [])

    return (
        <div>
            <Messages wsChannel={wsChannel}/>
            <AddMessageForm wsChannel={wsChannel}/>
        </div>
    )
}

const Messages: React.FC<{ wsChannel: WebSocket | null }> = ({wsChannel}) => {

    const [messages, setMessages] = useState<ChatMessageType[]>([])

    useEffect(() => {
        let messageHandler = (e: MessageEvent) => {
            let newMessages = JSON.parse(e.data)
            setMessages(prevMessages => [...prevMessages, ...newMessages])
        }
        wsChannel?.addEventListener('message', messageHandler)

        return () => {
            wsChannel?.removeEventListener('message', messageHandler)
        }
    }, [wsChannel])

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


type ValuesType = {
    message: string
}

const AddMessageForm: React.FC<{ wsChannel: WebSocket | null }> = ({wsChannel}) => {

    const [readyStatus, setReadyStatus] = useState<'pending' | 'ready'>('pending')

    useEffect(() => {
        let openHandler = () => {
            setReadyStatus('ready')
        }

        wsChannel?.addEventListener('open', openHandler)

        return () => {
            wsChannel?.removeEventListener('open', openHandler)
        }
    }, [wsChannel])


    return (
        <div>
            <Formik enableReinitialize
                    initialValues={{message: ''}}
                    onSubmit={(values: ValuesType, {resetForm}) => {
                        wsChannel?.send(values.message)
                        resetForm()
                    }}>

                <Form className={styles.message__form}>
                    <Field
                        component={AntInput}
                        placeholder='Input message...'
                        name="message"
                        type="text"
                    />
                    <Button htmlType="submit"
                            type="primary"
                            icon={<SendOutlined/>}
                            disabled={wsChannel === null || readyStatus !== 'ready'}

                    >
                        Send
                    </Button>
                </Form>

            </Formik>
        </div>
    )
}

export default ChatPage2