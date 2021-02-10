import 'antd/dist/antd.css'
import { Form, Image, Input } from 'antd'
import React from 'react'

type PropsType = {
    captchaUrl: string
}

export const Captcha: React.FC<PropsType> = ({ captchaUrl }) => {
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