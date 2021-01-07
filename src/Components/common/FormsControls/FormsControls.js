import style from "./FormControls.module.css"

export const TextArea = ({input, meta, ...props}) => {

    const hasError = (meta.error || meta.submitError) && meta.touched;



    return (
        <div>

            <input className={style.formControl + " " + (hasError ? style.error : "")} {...input} {...props}/>

            {hasError && <span>{meta.error || meta.submitError}</span>}

        </div>
    )
}