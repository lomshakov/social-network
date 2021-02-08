import React from 'react'
import {actions, ActionsTypes} from '../../Redux/dialogs-reducer'
import Dialogs from './Dialogs'
import {connect} from 'react-redux'
import {withAuthRedirect} from '../../hoc/withAuthRedirect'
import {compose} from 'redux'
import {AppStateType} from '../../Redux/redux-store'
import {DialogType, MessageType} from '../../types/types'

const DialogsContainer: React.FC<MapStateToPropsType & MapDispatchToPropsType> = ({ dialogs, messages, addMessage, isAuth }) => {

    return <Dialogs dialogs={dialogs}
                    messages={messages}
                    addMessage={addMessage} />

}

type MapStateToPropsType = {
    dialogs: Array<DialogType>
    messages: Array<MessageType>
    isAuth: boolean
}

type MapDispatchToPropsType = {
    addMessage: (formData: string) => void
}

let mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        dialogs: state.dialogsPage.dialogs,
        messages: state.dialogsPage.messages,
        isAuth: state.auth.isAuth
    }
}

export default compose<React.ComponentType>(
    connect(mapStateToProps, {addMessage: actions.addMessage}),
    withAuthRedirect
)(DialogsContainer)


