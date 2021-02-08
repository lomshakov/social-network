import React from 'react'
import style from './Dialogs.module.css'
import DialogItem from './DialogItem/DialogItem'
import Message from './Message/Message'
import { Field, Form } from 'react-final-form'
import { TextArea } from '../common/FormsControls/FormsControls'
import { composeValidators, maxLength, minLength, required } from '../../utils/validators/validators'
import { Button } from 'antd'
import {DialogType, MessageType} from '../../types/types'

type DispatchType = {
    addMessage: (formData: string) => void
}

type PropsType = {
    dialogs: Array<DialogType>
    messages: Array<MessageType>
}

const Dialogs: React.FC<PropsType & DispatchType> = ({ dialogs, messages, addMessage }) => {

    let dialogsData = dialogs.map(dialog => <DialogItem name={dialog.name} id={dialog.id} key={dialog.id}/>)
    let messagesData = messages.map(message => <Message message={message} />)

    return (
        <div className={style.dialogs}>
            <div className={style.dialogsRow}>
                <div className={style.dialog}>
                    {dialogsData}
                </div>
                <div className={style.messages}>
                    {messagesData}
                </div>
            </div>

            <MessageForm addMessage={addMessage}/>

        </div>
    )
}

const MessageForm: React.FC<DispatchType> = ({ addMessage }) => {

    const onFinish = (formData: any) => {
        addMessage(formData.message)
    }

    return (
        <Form onSubmit={onFinish}
              render={({handleSubmit, submitting, pristine}) => (
                  <form onSubmit={handleSubmit} className={style.submitRow}>

                      <Field name="message"
                             component={TextArea as React.FC}
                             validate={composeValidators(required, minLength(5), maxLength(200))}
                             placeholder={"message here..."}>
                      </Field>

                      <Button type="primary"
                              htmlType="submit"
                              disabled={submitting || pristine}>Add post
                      </Button>

                  </form>
              )}
        />
    )
}

export default Dialogs

