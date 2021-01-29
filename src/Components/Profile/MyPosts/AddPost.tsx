import style from './AddPostWall.module.css'
import 'antd/dist/antd.css'
import { Field, Form } from 'react-final-form'
import React from 'react'
import { TextArea } from '../../common/FormsControls/FormsControls'
import { composeValidators, maxLength, minLength, required } from '../../../utils/validators/validators'
import { Button } from 'antd'

type PropsType = {
    addPost: (formData: any) => void
}

const AddPost: React.FC<PropsType> = ({ addPost }) => {

    let addNewPost = (formData: any) => {
        addPost(formData.message)
    }

    return (
        <Form onSubmit={addNewPost}
              render={({handleSubmit, submitting, pristine}) => (
                  <form className={style.AddPostArea} onSubmit={handleSubmit}>
                      <Field name="message"
                             component={TextArea}
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

export default AddPost