import 'antd/dist/antd.css';
import style from "./FormControls.module.css"
import {Input} from "antd";
import FormItem from "antd/lib/form/FormItem";

export const TextArea = ({ input, meta: {error, submitError, touched} }) => {

    const hasError = (error || submitError) && touched;


    return (
        <FormItem>

            <Input  className={style.formControl + " " + (hasError ? style.error : "")} {...input}/>

            {hasError && <span>{error || submitError}</span>}

        </FormItem>
    )
}