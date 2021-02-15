import {
    chatAPI,
    ChatMessageAPIType,
    MessagesReceivedSubscribersType,
    StatusChangedSubscribersType,
    StatusType
} from '../api/chat-api'
import {BaseThunkType, InferActionsType} from './redux-store'
import {Dispatch} from 'redux'
import { v4 as uuidv4 } from 'uuid'

let initialState = {
    messages: [] as ChatMessageType[],
    status: 'pending' as StatusType
}

export type ChatMessageType = ChatMessageAPIType & {id: string}

const chatReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case 'CHAT/MESSAGES_RECEIVED':
            return {
                ...state,
                messages: [...action.payload.messages.map( m => ({...m, id: uuidv4()}) )]
            }
        case 'CHAT/STATUS_CHANGED':
            return {
                ...state,
                status: action.payload.status
            }

        default:
            return {
                ...state
            }
    }
}

type InitialStateType = typeof initialState
type ActionsTypes = InferActionsType<typeof actions>
type ThunkType = BaseThunkType<ActionsTypes>

export const actions = {
    messagesReceived: (messages: ChatMessageAPIType[]) => ({type: 'CHAT/MESSAGES_RECEIVED', payload: {messages}} as const),
    statusChanged: (status: StatusType) => ({type: 'CHAT/STATUS_CHANGED', payload: {status}} as const)
}

let _newMessageHandler: (((messages: ChatMessageAPIType[]) => void) | null) = null
const newMessageHandlerCreator = (dispatch: Dispatch) => {
    if (_newMessageHandler === null) {
        _newMessageHandler = (messages) => {
            dispatch(actions.messagesReceived(messages))
        }
    }

    return _newMessageHandler
}

let _statusChangedHandler: (((status: StatusType) => void) | null) = null
const statusChangedHandlerCreator = (dispatch: Dispatch) => {
    if (_statusChangedHandler === null) {
        _statusChangedHandler = (status) => {
            dispatch(actions.statusChanged(status))
        }
    }

    return _statusChangedHandler
}

export const startChat = (): ThunkType => async (dispatch) => {
    chatAPI.startWsChannel()
    chatAPI.subscribe('messages-received', newMessageHandlerCreator(dispatch) as MessagesReceivedSubscribersType)
    chatAPI.subscribe('status-changed', statusChangedHandlerCreator(dispatch) as StatusChangedSubscribersType)
}

export const stopChat = (): ThunkType => async (dispatch) => {
    chatAPI.unsubscribe('messages-received', newMessageHandlerCreator(dispatch) as MessagesReceivedSubscribersType)
    chatAPI.unsubscribe('status-changed', statusChangedHandlerCreator(dispatch) as StatusChangedSubscribersType)
    chatAPI.stopWsChannel()
}

export const sendMessage = (message: string): ThunkType => async (dispatch) => {
    chatAPI.sendMessage(message)
}

export default chatReducer