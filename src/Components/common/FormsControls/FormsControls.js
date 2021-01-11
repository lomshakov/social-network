import 'antd/dist/antd.css';
import style from "./FormControls.module.css"
import {Input} from "antd";
import FormItem from "antd/lib/form/FormItem";

export const TextArea = ({input, meta}) => {

    const hasError = (meta.error || meta.submitError) && meta.touched;



    return (
        <FormItem>

            <Input  className={style.formControl + " " + (hasError ? style.error : "")} {...input}/>

            {hasError && <span>{meta.error || meta.submitError}</span>}

        </FormItem>
    )
}