import React from 'react'
import {Field, Form} from 'react-final-form'
import style from './AddPost.module.css'
import {TextArea} from '../../common/FormsControls/FormsControls'
import {composeValidators, maxLength, minLength, required} from '../../../utils/validators/validators'
import {Button} from 'antd'
import {useDispatch} from 'react-redux'
import {actions} from '../../../Redux/profile-reducer'

export const AddPost: React.FC = () => {

    const dispatch = useDispatch()

    let onFinish = (formData: any) => {
        dispatch(actions.addPost(formData.message))
    }

    return (
        <Form onSubmit={onFinish}
              render={({handleSubmit, submitting, pristine}) => (
                  <form className={style.AddPostArea} onSubmit={handleSubmit}>
                      <Field name="message"
                             component={TextArea as React.FC}
                             validate={composeValidators(required, minLength(5), maxLength(200))}
                             placeholder={"post here..."}>
                      </Field>

                      <Button type="primary"
                              htmlType="submit"
                              disabled={submitting || pristine}>Add post
                      </Button>
                  </form>
              )
              }
        />
    )
}