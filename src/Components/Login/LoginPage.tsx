import 'antd/dist/antd.css'
import React, {useState} from 'react'
import {Modal} from 'antd'
import {Redirect} from 'react-router-dom'
import {useSelector} from 'react-redux'
import {AppStateType} from '../../Redux/redux-store'
import {LoginForm} from './LoginForm'


export const LoginPage: React.FC = () => {

    const [visible, setVisible] = useState(true)
    const isAuth = useSelector((state: AppStateType) => state.auth.isAuth)

    const handleCancel = () => {
        setVisible(false)
    }

    if (isAuth) {
        return <Redirect to={"/profile"}/>
    }

    return (
        <Modal
            title="Login"
            visible={visible}
            onCancel={handleCancel}
            footer={null}
        >
            <LoginForm/>
        </Modal>
    )
}

