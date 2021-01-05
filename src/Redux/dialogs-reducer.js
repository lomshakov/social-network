const ADD_MESSAGE = 'ADD-MESSAGE';

let initialState = {

    dialogs: [{id: 1, name: 'Dmitry'},
        {id: 2, name: 'Alex'},
        {id: 3, name: 'Sveta'},
        {id: 4, name: 'Anna'}
    ],

    messages: [{id: 1, message: 'Hi!!'},
        {id: 2, message: 'Ok))'},
        {id: 3, message: 'Good Day!))'},
        {id: 4, message: 'Fuck....'}
    ]
};

const dialogsReducer = (state = initialState, action) => {

    switch (action.type) {
        case ADD_MESSAGE:

            let newMessage = {id: 5, message: action.message};

            return {
                ...state,
                messages: [...state.messages, newMessage]
            };

        default:
            return state;
    }
};

export const addMessageActionCreator = (message) => ({type: ADD_MESSAGE, message: message});

export default dialogsReducer;