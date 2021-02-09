import {Field, Form, Formik} from "formik"
import React from "react"
import {SearchFilterType} from "../../Redux/users-reducer"
import {Button, Input} from "antd"
import {DownloadOutlined, SearchOutlined} from "@ant-design/icons"
import {AntInput, AntSelect} from "../common/FormsControls/CreateAntFields"

type PropsType = {
    onSearchFilterChanged: (filter: SearchFilterType) => void
}

/*const UserSearchForm: React.FC<PropsType> = ({ onSearchFilterChanged }) => {
    const onSearch = (values: string) => {
        const filter = {term: values}
        onSearchFilterChanged(filter)
    }

    return (
        <div>
            <Search id='term' placeholder="search your friends" onSearch={onSearch as any} enterButton/>
        </div>
    )
}*/

const options = ['All users', 'Only friends']

const options2 = [
    {text: 'All', value: 'null'},
    {text: 'Only followed', value: 'true'},
    {text: 'Only unfollowed', value: 'false'}
]

type FormType = {
    term: string
    friend: 'true' | 'false' | 'null'
}

const UserSearchForm: React.FC<PropsType> = ({ onSearchFilterChanged }) => {
    const onSearch = (values: FormType) => {
        const filter: SearchFilterType = {
            term: values.term,
            friend: values.friend === 'null' ? null : values.friend === 'true' ? true : false
        }
        debugger
        onSearchFilterChanged(filter)
        console.log(values)
    }

    return (
        <div>
            <Formik
                initialValues={{
                    term: ''
                }}
                onSubmit={onSearch as any}
            >
                <Form>
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
                        label="Show options"
                        defaultValue={options2[0].text}
                        selectOptions={options2}
                    />

                    {/*<Field id="term" name="term" placeholder="Search your friend" render={({field, type, ...props}: any) => <Input {...field} {...props} id="terms" name="terms" onChange={type ? onInputChange : onChange}/>} />*/}
                    <Button htmlType="submit" type="primary" icon={<SearchOutlined />} />
                </Form>
            </Formik>
        </div>
    )
}

export default UserSearchForm