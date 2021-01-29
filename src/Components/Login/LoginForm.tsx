import 'antd/dist/antd.css'
import React, { useState } from 'react'
import { Form, Input, Button, Checkbox, Alert, Modal } from 'antd'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { login } from '../../Redux/auth-reducer'
import Captcha from './Captcha'
import { AppStateType } from '../../Redux/redux-store'

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 }
}

const tailLayout = {
    wrapperCol: { offset: 8, span: 16 }
}

const ModalLogin: React.FC<MapStateToPropsType & MapDispatchToPropsType> = ({ isAuth, login, authError, captchaUrl }) => {

    const [visible, setVisible] = useState(true)

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
            <LoginForm login={login} authError={authError} captchaUrl={captchaUrl} isAuth={isAuth}/>
        </Modal>
    )
}

const LoginForm: React.FC<MapStateToPropsType & MapDispatchToPropsType> = ({ login, authError, captchaUrl }) => {

    const onFinish = (values: any) => {
        login(values.email, values.password, values.remember, values.captcha)
    }

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo)
    }

    return (
        <Form
            {...layout}
            name="basic"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
        >

            {authError && <Alert style={{ marginBottom: "30px" }}
                                       message={"Error: " + `${authError}`}
                                       type="error"
                                       showIcon />}

            <Form.Item
                label="Email"
                name="email"
                rules={[{ required: true, message: 'Please input your username!' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Password"
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item {...tailLayout} name="remember" valuePropName="checked">
                <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Form.Item {...tailLayout}>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>

            { captchaUrl && <Captcha captchaUrl={captchaUrl} /> }

        </Form>
    )
}

type MapStateToPropsType = {
    isAuth: boolean
    authError: string | null
    captchaUrl: string | null
}

type MapDispatchToPropsType = {
    login: (email: string, password: string, rememberMe: boolean, captcha: null | string) => void
}

const mapStateToProps = (state: AppStateType): MapStateToPropsType => ({
    isAuth: state.auth.isAuth,
    authError: state.auth.authError,
    captchaUrl: state.auth.captchaUrl
})

export default connect(mapStateToProps, { login })(ModalLogin)