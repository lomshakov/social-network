import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {login} from '../../Redux/auth-reducer'
import {Alert, Button, Checkbox, Form, Input} from 'antd'
import {Captcha} from './Captcha'
import {getAuthError, getCaptchaUrl} from '../../Redux/auth-selectors'

const layout = {
    labelCol: {span: 8},
    wrapperCol: {span: 16}
}

const tailLayout = {
    wrapperCol: {offset: 8, span: 16}
}

export const LoginForm: React.FC = () => {

    const authError = useSelector(getAuthError)
    const captchaUrl = useSelector(getCaptchaUrl)

    const dispatch = useDispatch()

    const onFinish = (values: ValuesLoginType) => {
        dispatch(login(values))
    }

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo)
    }

    return (
        <Form
            {...layout}
            name="basic"
            initialValues={{remember: true}}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
        >

            {authError && <Alert style={{marginBottom: "30px"}}
                                 message={"Error: " + `${authError}`}
                                 type="error"
                                 showIcon/>}

            <Form.Item
                label="Email"
                name="email"
                rules={[{required: true, message: 'Please input your username!'}]}
            >
                <Input/>
            </Form.Item>

            <Form.Item
                label="Password"
                name="password"
                rules={[{required: true, message: 'Please input your password!'}]}
            >
                <Input.Password/>
            </Form.Item>

            <Form.Item {...tailLayout} name="remember" valuePropName="checked">
                <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Form.Item {...tailLayout}>
                <Button type="primary" htmlType="submit">
                    Login
                </Button>
            </Form.Item>

            {captchaUrl && <Captcha captchaUrl={captchaUrl}/>}

        </Form>
    )
}

export type ValuesLoginType = {
    email: string
    password: string
    rememberMe: boolean
    captcha: null | string
}