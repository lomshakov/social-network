import {getAuthData} from "./auth-reducer";

const SET_INITIALIZED = 'app/SET_INITIALIZED';

type InitialStateType = {
    initialized: boolean
};

let initialState: InitialStateType = {
    initialized: false
};

const appReducer = (state = initialState, action: any): InitialStateType => {

    switch (action.type) {
        case SET_INITIALIZED:
            return {
                ...state,
                initialized: true
            }

        default:
            return state;
    }
};

type SetInitializedActionType = {
    type: typeof SET_INITIALIZED
}
export const setInitialized = (): SetInitializedActionType => ( {type: SET_INITIALIZED} as SetInitializedActionType);

export const initializeApp = () => async (dispatch: any) => {
    await dispatch(getAuthData());
    dispatch(setInitialized());
}

export default appReducer;