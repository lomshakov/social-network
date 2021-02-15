import './ProfileDataEdit.css'
import 'antd/dist/antd.css'
import React from 'react'
import {Button, Form, Input, Select} from 'antd'
import {ProfileType} from '../../../types/types'

const { Option } = Select

type PropsType = {
    profile: ProfileType
    handleSubmit: (values: ProfileType) => void
    deactivateEditMode: () => void
}

export const ProfileDataEdit: React.FC<PropsType> = ({ handleSubmit, profile, deactivateEditMode }) => {

    const layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 },
    }

    const validateMessages = {
        required: '${label} is required!',
        types: {
            email: '${label} is not a valid email!',
            number: '${label} is not a valid number!',
        },
        number: {
            range: '${label} must be between ${min} and ${max}',
        },
    }

    return (
        <Form {...layout} name="editProfile"
              onFinish={handleSubmit}
              validateMessages={validateMessages}
              initialValues={{ ...profile }}>

            <Form.Item name="fullName" label="Name" rules={[{ required: true }]}>
                <Input />
            </Form.Item>
            <Form.Item name="lookingForAJob" label="Looking for a job" rules={[{ required: true }]}>
                <Select>
                    <Option value={true as any}>Yes</Option>
                    <Option value={false as any}>No</Option>
                </Select>
            </Form.Item>
            <Form.Item name="lookingForAJobDescription" label="My skills" rules={[{ required: true }]}>
                <Input />
            </Form.Item>
            <Form.Item name="aboutMe" label="About me" rules={[{ required: true }]}>
                <Input />
            </Form.Item>
            {Object.keys(profile.contacts).map(key => {
                return <Form.Item name={['contacts', key]} label={key}>
                            <Input />
                        </Form.Item>
            })}
            <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>

                <Button htmlType="button" onClick={deactivateEditMode}>
                    Cancel
                </Button>
            </Form.Item>
        </Form>
    )
}