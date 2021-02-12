let subscribers = [] as SubscribersType[]

let ws: WebSocket | null = null

const closeHandler = () => {
    console.log('ERROR: close websocket')
    setTimeout(createChannel, 3000)
}

const messageHandler = (e: MessageEvent) => {
    const newMessages = JSON.parse(e.data)
    subscribers.forEach(s => s(newMessages))
}

function createChannel() {
    ws?.removeEventListener('close', closeHandler)
    ws?.close()
    ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')
    ws?.addEventListener('close', closeHandler)
    ws?.addEventListener('message', messageHandler)
}

export const chatAPI = {
    startWsChannel() {
        createChannel()
    },
    stopWsChannel() {
        subscribers = []
        ws?.removeEventListener('close', closeHandler)
        ws?.removeEventListener('message', messageHandler)
        ws?.close()
    },
    subscribe(callback: SubscribersType) {
        subscribers.push(callback)
        return () => {
            subscribers = subscribers.filter(s => s !== callback)
        }
    },
    unsubscribe(callback: SubscribersType) {
        subscribers = subscribers.filter(s => s !== callback)
    },
    sendMessage(message: string) {
        ws?.send(message)
    }
}

export type SubscribersType = (messages: ChatMessageType[]) => void

export type ChatMessageType = {
    message: string,
    photo: string,
    userId: number,
    userName: string
}