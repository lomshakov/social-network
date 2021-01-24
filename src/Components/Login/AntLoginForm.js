import 'antd/dist/antd.css';
import React, {useState} from "react";
import {Form, Input, Button, Checkbox, Alert, Modal, Image} from 'antd';
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";
import {login} from "../../Redux/auth-reducer";

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};

const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};

const AntLoginForm = ({ isAuth, login, authError, captchaUrl }) => {

    const [visible, setVisible] = useState(true);

    const handleCancel = () => {
        setVisible(false);
    };

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
            <LoginForm login={login} authError={authError} captchaUrl={captchaUrl}/>
        </Modal>
    )
}

const LoginForm = ({ login, authError, captchaUrl }) => {

    const onFinish = (values) => {
        login(values.email, values.password, values.remember, values.captcha)
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

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
    );
};

const Captcha = ({ captchaUrl }) => {
    return (
        <div>
            <Form.Item label="Captcha:">
                <Image width={200} src={captchaUrl} />
            </Form.Item>

            <Form.Item label="Please, type symbols:"
                       name="captcha">
                <Input />
            </Form.Item>
        </div>
    )
}

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    authError: state.auth.authError,
    captchaUrl: state.auth.captchaUrl
})

export default connect(mapStateToProps, {login})(AntLoginForm);