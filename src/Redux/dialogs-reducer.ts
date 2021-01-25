const SEND_MESSAGE = 'DIALOGS/ADD-MESSAGE'

type DialogType = {
    id: number
    name: string
}

type MessageType = {
    id: number
    message: string
}

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

const dialogsReducer = (state = initialState, action: any): InitialStateType => {

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
};

type addMessageActionType = {
    type: typeof SEND_MESSAGE
    message: string
}
export const addMessage = (message: string): addMessageActionType => ({ type: SEND_MESSAGE, message: message })

export default dialogsReducer