import {chatAPI, ChatMessageType, SubscribersType} from '../api/chat-api'
import {BaseThunkType, InferActionsType} from './redux-store'
import {Dispatch} from 'redux'

let initialState = {
    messages: [] as ChatMessageType[]
}

const chatReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case 'CHAT/MESSAGES_RECEIVED':
            return {
                ...state,
                messages: [...state.messages, ...action.payload.messages]
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
    messagesReceived: (messages: ChatMessageType[]) => ({type: 'CHAT/MESSAGES_RECEIVED', payload: {messages}})
}

let _newMessageHandler: (((messages: ChatMessageType[]) => void) | null) = null

const newMessageHandlerCreator = (dispatch: Dispatch) => {
    if (_newMessageHandler === null) {
        _newMessageHandler = (messages) => {
            dispatch(actions.messagesReceived(messages))
        }
    }
    debugger

    return _newMessageHandler
}

export const startChat = (): ThunkType => async (dispatch) => {
    chatAPI.startWsChannel()
    chatAPI.subscribe(newMessageHandlerCreator(dispatch) as SubscribersType)
}

export const stopChat = (): ThunkType => async (dispatch) => {
    chatAPI.unsubscribe(newMessageHandlerCreator(dispatch) as SubscribersType)
    chatAPI.stopWsChannel()
}

export const sendMessage = (message: string): ThunkType => async (dispatch) => {
    chatAPI.sendMessage(message)
}

export default chatReducer