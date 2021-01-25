import { applyMiddleware, combineReducers, compose, createStore } from 'redux'
import thunkMiddleware from 'redux-thunk'
import profileReducer from './profile-reducer'
import dialogsReducer from './dialogs-reducer'
import sidebarReducer from './sidebar-reducer'
import usersReducer from './users-reducer'
import authReducer from './auth-reducer'
import appReducer from './app-reducer'

let rootReducer = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    sidebar: sidebarReducer,
    usersPage: usersReducer,
    auth: authReducer,
    app: appReducer
});

// for working Redux DevTools Google Chrome extension
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
let store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunkMiddleware)))

// create store without Redux DevTools:
// let store = createStore(reducers, applyMiddleware(thunkMiddleware));
window.__store__ = store
export default store