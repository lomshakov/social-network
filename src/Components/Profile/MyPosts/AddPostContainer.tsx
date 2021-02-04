import React from 'react'
import { actions } from '../../../Redux/profile-reducer'
import { connect } from 'react-redux'
import { Field, Form } from 'react-final-form'
import style from './AddPostWall.module.css'
import { TextArea } from '../../common/FormsControls/FormsControls'
import { composeValidators, maxLength, minLength, required } from '../../../utils/validators/validators'
import { Button } from 'antd'

const AddPostContainer: React.FC<MapDispatchToPropsType> = ({ addPost }) => {
    let addNewPost = (formData: any) => {
        addPost(formData.message)
    }

    return (
        <Form onSubmit={addNewPost}
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

type MapDispatchToPropsType = {
    addPost: (formData: any) => void
}

export default connect(null, { addPost: actions.addPost })(AddPostContainer)