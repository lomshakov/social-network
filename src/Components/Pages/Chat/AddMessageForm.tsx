import React from 'react'
import styles from './ChatPage.module.css'
import {Button, Input} from 'antd'
import {Field, Form, Formik} from 'formik'
import {AntInput} from "../../common/FormsControls/CreateAntFields";
import {SearchOutlined, SendOutlined} from "@ant-design/icons";
import {wsChannel} from "./ChatPage";

type PropsType = {
    addMessage: (message: string) => void
}

type ValuesType = {
    message: string
}

export const AddMessageForm: React.FC<PropsType> = ({addMessage}) => {

    return (
        <div>
            <Formik enableReinitialize
                    initialValues={{message: ''}}
                    onSubmit={(values: ValuesType, {resetForm}) => {
                        addMessage(values.message)
                        resetForm()
                    }}>

                <Form className={styles.message__form}>
                    <Field
                        component={AntInput}
                        placeholder='Input message...'
                        name="message"
                        type="text"
                    />
                    <Button htmlType="submit"
                            type="primary"
                            icon={<SendOutlined/>}
                            disabled={wsChannel.readyState !== wsChannel.OPEN}

                    >
                        Send
                    </Button>
                </Form>

            </Formik>
        </div>
    )
}