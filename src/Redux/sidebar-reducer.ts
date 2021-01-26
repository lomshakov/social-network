// initial state
let initialState = {

}

type InitialStateType = typeof initialState

// reducer
const sidebarReducer = (state = initialState, action: any): InitialStateType => {
    return state;
}

export default sidebarReducer