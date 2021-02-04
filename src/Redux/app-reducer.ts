import { getAuthData } from './auth-reducer'
import {AppStateType, BaseThunkType, InferActionsType} from './redux-store'
import {Dispatch} from 'redux'

// initial state
let initialState = {
    initialized: false
}

// reducer
const appReducer = (state = initialState, action: ActionsTypes): InitialStateType => {

    switch (action.type) {
        case 'APP/SET_INITIALIZED':
            return {
                ...state,
                initialized: true
            }

        default:
            return state
    }
}

type InitialStateType = typeof initialState
type ActionsTypes = InferActionsType<typeof actions>

// actions
const actions = {
    setInitialized: () => ({ type: 'APP/SET_INITIALIZED' } as const)
}

// definition types for thunks-creators
type DispatchType = Dispatch<ActionsTypes>
type ThunkType = BaseThunkType<ActionsTypes>

// thunks
export const initializeApp = (): ThunkType => async (dispatch) => {
    await dispatch(getAuthData())
    dispatch(actions.setInitialized())
}

export default appReducer