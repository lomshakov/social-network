import style from "./FormControls.module.css"

export const TextArea = ({input, meta, ...props}) => {

    const hasError = meta.touched && meta.error

    return (
        <div>

            <input className={style.formControl + " " + (hasError ? style.error : "")} {...input} {...props}
                   type="text"/>

            {hasError && <span>{meta.error}</span>}

        </div>
    )
}