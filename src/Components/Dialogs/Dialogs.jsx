import style from './Dialogs.module.css'
import DialogItem from './DialogItem/DialogItem'
import Message from './Message/Message'
import React from 'react'
import { Field, Form } from 'react-final-form'
import { TextArea } from '../common/FormsControls/FormsControls'
import { composeValidators, maxLength, minLength, required } from '../../utils/validators/validators'
import { Button } from 'antd'

const Dialogs = (props) => {

    let dialogsData = props.dialogsPage.dialogs.map(dialog => <DialogItem name={dialog.name} id={dialog.id} key={dialog.id}/>);
    let messagesData = props.dialogsPage.messages.map(message => <Message message={message.message} key={message.id}/>);

    let addMessage = (formData) => {
        props.addMessage(formData.message);
    }

    // if (!props.isAuth) return <Redirect to="/login"/>

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
};

const MessageForm = (props) => {

    return (
        <Form onSubmit={props.addMessage}
              render={({handleSubmit, submitting, pristine}) => (
                  <form onSubmit={handleSubmit} className={style.submitRow}>

                      <Field name="message"
                             component={TextArea}
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

export default Dialogs;

