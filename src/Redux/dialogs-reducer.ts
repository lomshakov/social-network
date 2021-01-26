import { DialogType, MessageType } from '../types/types'

// string types
const SEND_MESSAGE = 'DIALOGS/ADD-MESSAGE'

// initial state
let initialState = {
    dialogs: [{id: 1, name: 'Dmitriy'},
        {id: 2, name: 'Alex'},
        {id: 3, name: 'Svetlana'},
        {id: 4, name: 'Anna'}
    ] as Array<DialogType>,

    messages: [{id: 1, message: 'Hi!!'},
        {id: 2, message: 'Ok))'},
        {id: 3, message: 'Good Day!))'},
        {id: 4, message: 'Fuck....'}
    ] as Array<MessageType>
}

type InitialStateType = typeof initialState

// reducer
const dialogsReducer = (state = initialState, action: ActionsTypes): InitialStateType => {

    switch (action.type) {
        case SEND_MESSAGE:
            let newMessage = {id: 5, message: action.message}
            return {
                ...state,
                messages: [...state.messages, newMessage]
            }

        default:
            return state
    }
}
// definition types for Action creators
type addMessageActionType = {
    type: typeof SEND_MESSAGE
    message: string
}

// main actions type
type ActionsTypes = addMessageActionType

// action-creators
export const addMessage = (message: string): addMessageActionType => ({ type: SEND_MESSAGE, message })

export default dialogsReducer