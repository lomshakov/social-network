import style from "../Profile.module.css";
import 'antd/dist/antd.css';
import React from "react";
import {Button, Form, Input, InputNumber, Select, message} from "antd";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";

const { Option } = Select;

const ProfileDataEdit = ({ handleSubmit, profile, error }) => {

    const layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 },
    };

    const validateMessages = {
        required: '${label} is required!',
        types: {
            email: '${label} is not a valid email!',
            number: '${label} is not a valid number!',
        },
        number: {
            range: '${label} must be between ${min} and ${max}',
        },
    };

    return (
        <Form {...layout} name="editProfile"
              onFinish={handleSubmit}
              validateMessages={validateMessages}
              initialValues={{ ...profile }}>

            {/*{error && message.error(error)}*/}

            <Form.Item name="fullName" label="Name" rules={[{ required: true }]}>
                <Input />
            </Form.Item>
            <Form.Item name="lookingForAJob" label="Looking for a job" rules={[{ required: true }]}>
                <Select>
                    <Option value={true}>Yes</Option>
                    <Option value={false}>No</Option>
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
            </Form.Item>
        </Form>
    )
}

export default ProfileDataEdit