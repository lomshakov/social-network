import React from 'react'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {AppStateType} from '../Redux/redux-store'

type PropsType = {
    isAuth: boolean
}

const mapStateToPropsForRedirect = (state: AppStateType) => ({
    isAuth: state.auth.isAuth
})

export const withAuthRedirect = (WrappedComponent: React.ComponentType) => {
    const RedirectComponent: React.FC<PropsType> = (props) => {
        let {isAuth, ...restProps} = props
        if (!isAuth) return <Redirect to="/login"/>
        return <WrappedComponent {...restProps} />
    }

    return connect(mapStateToPropsForRedirect)(RedirectComponent)
}