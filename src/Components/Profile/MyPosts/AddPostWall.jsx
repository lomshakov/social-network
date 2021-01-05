import style from './AddPostWall.module.css';
import {Field, Form} from 'react-final-form'
import * as React from "react";
import {TextArea} from "../../common/FormsControls/FormsControls";
import {composeValidators, maxLength, minLength, required} from "../../../utils/validators/validators";

const AddPostWall = (props) => {

    let addNewPost = (formData) => {
        props.addPost(formData.message)
    }

    return (
        <div className={style.AddPostToWall}>
            <div className={style.AddPostArea}>

                <AddPostForm addNewPost={addNewPost}/>

            </div>
        </div>
    )
};

const AddPostForm = (props) => {
    return (
        <Form onSubmit={props.addNewPost}
              render={({handleSubmit, submitting, pristine}) => (
                  <form className={style.AddPostArea} onSubmit={handleSubmit}>

                      <Field name="message"
                             component={TextArea}
                             validate={composeValidators(required, minLength(5), maxLength(200))}
                             placeHolder={"post here..."}>
                      </Field>

                    <button className={style.button} type="submit" disabled={submitting || pristine}>Add post</button>

                  </form>
              )
              }
        />


    )
}

export default AddPostWall;