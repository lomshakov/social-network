import { getAuthData } from './auth-reducer'
import {ThunkAction} from "redux-thunk";
import {AppStateType} from "./redux-store";
import {Dispatch} from "redux";

// string types
const SET_INITIALIZED = 'APP/SET_INITIALIZED'

// initial state
let initialState = {
    initialized: false
}

// reducer
const appReducer = (state = initialState, action: ActionsTypes): InitialStateType => {

    switch (action.type) {
        case SET_INITIALIZED:
            return {
                ...state,
                initialized: true
            }

        default:
            return state
    }
}

type InitialStateType = typeof initialState

// definition types for Action creators
type SetInitializedActionType = {
    type: typeof SET_INITIALIZED
}

// main actions type
type ActionsTypes = SetInitializedActionType

// action-creators
export const setInitialized = (): SetInitializedActionType => ({ type: SET_INITIALIZED })

// definition types for thunks-creators
type DispatchType = Dispatch<ActionsTypes>
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>

// thunks
export const initializeApp = (): ThunkType => async (dispatch: any) => {
    await dispatch(getAuthData())
    dispatch(setInitialized())
}

export default appReducer