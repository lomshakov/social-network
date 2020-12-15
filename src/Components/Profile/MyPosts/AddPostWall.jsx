import style from './AddPostWall.module.css';
import * as React from "react";



const AddPostWall = (props) => {

    let onAddPost = () => {
        props.addPost();
    }

    let onPostChange = (e) => {
        let text = e.target.value;
        props.updateNewPostText(text);
    }

    return (
        <div className={style.AddPostToWall}>

            <div className={style.AddPostArea}>

                <div className={style.inputField}>
                    <textarea className={style.textArea}
                              placeholder='Напишите что-нибудь...'
                              onChange={onPostChange}
                              value={props.state.inputPostText}
                    />
                </div>

                <div className={style.buttonSubmit}>
                    <button className={style.button}
                            onClick={onAddPost}>Add post
                    </button>
                </div>

            </div>
        </div>
    )
};

export default AddPostWall;