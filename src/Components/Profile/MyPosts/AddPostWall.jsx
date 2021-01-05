import style from './AddPostWall.module.css';
import {Form, Field} from 'react-final-form'
import * as React from "react";

const AddPostWall = (props) => {

    let addNewPost = (formData) => {
        props.addPost(formData.inputPostText)
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

                    <Field className={style.textArea}
                           name="inputPostText"
                           component="input"
                           type="textarea"
                           placeholder='Напишите что-нибудь...' />

                    <button className={style.button} type="submit" disabled={submitting || pristine}>Add post</button>

                  </form>
              )
              }
        />


    )
}

export default AddPostWall;