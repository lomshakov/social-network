import {actions} from '../../Redux/dialogs-reducer'
import Dialogs from './Dialogs'
import {connect} from 'react-redux'
import {withAuthRedirect} from '../../hoc/withAuthRedirect'
import {compose} from 'redux'
import * as React from 'react'
import Preloader from '../common/Preloader/Preloader'

class DialogsContainer extends React.Component{
    render() {
        return <>
            {this.props.isFetching
                ? <Preloader />
                : null}
            <Dialogs dialogsPage={this.props.dialogsPage}
                     addMessage={this.props.addMessage}
                     isAuth={this.props.isAuth}/>
        </>
    }
}

let mapStateToProps = (state) => {
    return {
        dialogsPage: state.dialogsPage,
        isAuth: state.auth.isAuth
    }
}

export default compose(
    connect(mapStateToProps, {addMessage: actions.addMessage}),
    withAuthRedirect
)(DialogsContainer);


