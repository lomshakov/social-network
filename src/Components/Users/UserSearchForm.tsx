import {Field, Form, Formik} from "formik"
import React from "react"
import {SearchFilterType} from "../../Redux/users-reducer"
import {Button} from "antd"
import {SearchOutlined} from "@ant-design/icons"
import {AntInput, AntSelect} from "../common/FormsControls/CreateAntFields"
import style from './Users.module.css'
import {useSelector} from "react-redux";
import {getSearchFilter} from "../../Redux/users-selectors";

type PropsType = {
    onSearchFilterChanged: (filter: SearchFilterType) => void
}

const options = [
    {text: 'All', value: 'null'},
    {text: 'Only followed', value: 'true'},
    {text: 'Only unfollowed', value: 'false'}
]

type FormType = {
    term: string
    friend: 'true' | 'false' | 'null'
}

export const UserSearchForm: React.FC<PropsType> = ({ onSearchFilterChanged }) => {

    const filter = useSelector(getSearchFilter)

    const onSearch = (values: FormType) => {
        const filter: SearchFilterType = {
            term: values.term,
            friend: values.friend === 'null' ? null : values.friend === 'true' ? true : false
        }

        onSearchFilterChanged(filter)
        console.log(values)
    }

    return (
        <div>
            <Formik
                enableReinitialize
                initialValues={{
                    term: filter.term,
                    friend: String(filter.friend)
                }}
                onSubmit={onSearch as any}
            >
                <Form className={style.search__form}>
                    <Field
                        component={AntInput}
                        placeholder='Search your friends'
                        name="term"
                        type="text"
                    />
                    <Field
                        component={AntSelect}
                        name="friend"
                        type="text"
                        defaultValue={options[0].text}
                        selectOptions={options}
                    />

                    <Button htmlType="submit" type="primary" icon={<SearchOutlined />} >Search</Button>
                </Form>
            </Formik>
        </div>
    )
}