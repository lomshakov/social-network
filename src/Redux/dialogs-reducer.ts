import { DialogType, MessageType } from '../types/types'
import {InferActionsType} from "./redux-store";

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

// reducer
const dialogsReducer = (state = initialState, action: ActionsTypes): InitialStateType => {

    switch (action.type) {
        case 'DIALOGS/SEND_MESSAGE':
            let newMessage = {id: 5, message: action.message}
            return {
                ...state,
                messages: [...state.messages, newMessage]
            }

        default:
            return state
    }
}

type InitialStateType = typeof initialState
type ActionsTypes = InferActionsType<typeof actions>

// actions
export const actions = {
    addMessage: (message: string) => ({ type: 'DIALOGS/SEND_MESSAGE', message } as const)
}

export default dialogsReducer