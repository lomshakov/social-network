let subscribers = {
    'messages-received': [] as MessagesReceivedSubscribersType[],
    'status-changed': [] as StatusChangedSubscribersType[]
}

let ws: WebSocket | null = null

const closeHandler = () => {
    notifySubscribersAboutStatus('pending')
    setTimeout(createChannel, 3000)
}

const openHandler = () => {
    notifySubscribersAboutStatus('ready')
}

const messageHandler = (e: MessageEvent) => {
    const newMessages = JSON.parse(e.data)
    subscribers['messages-received'].forEach(s => s(newMessages))
}

const errorHandler = () => {
    notifySubscribersAboutStatus('error')
    console.log('Error, refresh page')
}

const cleanUP = () => {
    ws?.removeEventListener('close', closeHandler)
    ws?.removeEventListener('message', messageHandler)
    ws?.removeEventListener('open', openHandler)
    ws?.removeEventListener('error', errorHandler)
}

const notifySubscribersAboutStatus = (status: StatusType) => {
    subscribers['status-changed'].forEach(s => s(status))
}

function createChannel() {
    cleanUP()
    ws?.close()
    ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')
    notifySubscribersAboutStatus('pending')
    ws?.addEventListener('close', closeHandler)
    ws?.addEventListener('message', messageHandler)
    ws?.addEventListener('open', openHandler)
    ws?.addEventListener('error', errorHandler)
}

export const chatAPI = {
    startWsChannel() {
        createChannel()
    },
    stopWsChannel() {
        subscribers = {'messages-received': [], "status-changed": []}
        cleanUP()
        ws?.close()
    },
    subscribe(event: EventsType, callback: MessagesReceivedSubscribersType | StatusChangedSubscribersType) {
        // @ts-ignore
        subscribers[event].push(callback)
        return () => {
            // @ts-ignore
            subscribers[event] = subscribers[event].filter(s => s !== callback)
        }
    },
    unsubscribe(event: EventsType, callback: MessagesReceivedSubscribersType | StatusChangedSubscribersType) {
        // @ts-ignore
        subscribers[event] = subscribers[event].filter(s => s !== callback)
    },
    sendMessage(message: string) {
        ws?.send(message)
    }
}

export type MessagesReceivedSubscribersType = (messages: ChatMessageAPIType[]) => void
export type StatusChangedSubscribersType = (status: StatusType) => void
type EventsType = 'messages-received' | 'status-changed'

export type ChatMessageAPIType = {
    message: string,
    photo: string,
    userId: number,
    userName: string
}

export type StatusType = 'pending' | 'ready' | 'error'