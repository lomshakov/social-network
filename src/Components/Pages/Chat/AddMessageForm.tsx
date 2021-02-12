import React from 'react'
import styles from './ChatPage.module.css'
import {Button} from 'antd'
import {Field, Form, Formik} from 'formik'
import {AntInput} from '../../common/FormsControls/CreateAntFields'
import {SendOutlined} from '@ant-design/icons'
import {useDispatch} from 'react-redux'
import {sendMessage} from '../../../Redux/chat-reducer'

type ValuesType = {
    message: string
}

export const AddMessageForm: React.FC = () => {

    // const [readyStatus, setReadyStatus] = useState<'pending' | 'ready'>('pending')
    const dispatch = useDispatch()
    const onSubmit = (values: ValuesType, {resetForm}: any) => {
        dispatch(sendMessage(values.message))
        resetForm()
    }

    return (
        <div>
            <Formik enableReinitialize
                    initialValues={{message: ''}}
                    onSubmit={onSubmit}>

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
                        /*disabled={wsChannel === null || readyStatus !== 'ready'}*/
                    >
                        Send
                    </Button>
                </Form>

            </Formik>
        </div>
    )
}