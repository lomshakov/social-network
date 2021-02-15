import React, {useEffect} from 'react'
import {Button, Col, Input, message, Row} from 'antd'
import {useDispatch, useSelector} from 'react-redux'
import {getErrorSelector, getProfileSelector} from '../../Redux/profile-selectors'
import {ProfileType} from '../../types/types'
import {getProfileData, savePhoto, saveProfile} from '../../Redux/profile-reducer'
import {compose} from 'redux'
import {withAuthRedirect} from '../../hoc/withAuthRedirect'
import userPhoto from '../../assets/images/user.png'
import {getUserIdSelector} from '../../Redux/auth-selectors'
import {Field, Form, Formik} from 'formik'
import {AntInput, AntSelect} from '../common/FormsControls/CreateAntFields'
import {SaveOutlined} from '@ant-design/icons'
import {isRequired} from '../../utils/validators/validate-fields'


const options = [
    {text: 'Yes', value: true},
    {text: 'No', value: false}
]

const Settings: React.FC = () => {
    debugger

    const profile = useSelector(getProfileSelector)
    const error = useSelector(getErrorSelector)
    const userId = useSelector(getUserIdSelector)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getProfileData(userId))
    }, [])

    const handleSubmit = async (values: ProfileType) => {
        await dispatch(saveProfile(values))
        if (error !== '') {
            message.error(error)
        } else {
            message.success('Profile settings save complete')
        }
    }

    const onChange = (e: any) => {
        if (e.target.files.length) {
            dispatch(savePhoto(e.target.files[0]))
        }
    }

    const layout = {
        labelCol: {span: 8},
        wrapperCol: {span: 16},
    }

    const validateMessages = {
        required: '${label} is required!',
        types: {
            email: '${label} is not a valid email!',
            number: '${label} is not a valid number!',
        },
        number: {
            range: '${label} must be between ${min} and ${max}',
        },
    }

    return (
        <div>
            <Row justify='center'>
                <Col span={24} style={{textAlign: 'center', marginBottom: '30px'}}>
                    <h2>Profile settings</h2>
                </Col>
            </Row>
            <Row>
                <Col span={8}>
                    <Row justify='center'>
                        <img src={profile?.photos.large || userPhoto} style={{justifySelf: 'center', maxWidth: '250px'}} alt='Profile Photo'/>
                    </Row>

                    <h3 style={{textAlign: 'center', margin: '20px'}}>Change your photo:</h3>
                    <Input type={'file'} onChange={onChange}/>
                </Col>

                <Col span={15}  style={{marginLeft: '20px'}}>


                        <Formik
                            enableReinitialize
                            initialValues={{...profile} as any}
                            onSubmit={handleSubmit}
                        >
                            <Form>

                                <Row>
                                    <Col span={6}>
                                        Full name*
                                    </Col>
                                    <Col span={18}>
                                        <Field
                                            component={AntInput}
                                            name="fullName"
                                            type="text"
                                            validate={isRequired}
                                        />
                                    </Col>
                                </Row>

                                <Row>
                                    <Col span={6}>
                                        Looking for a job*
                                    </Col>
                                    <Col span={18}>
                                        <Field
                                            component={AntSelect}
                                            name="lookingForAJob"
                                            type="text"
                                            selectOptions={options}
                                        />
                                    </Col>
                                </Row>

                                <Row>
                                    <Col span={6}>
                                        My skills*
                                    </Col>
                                    <Col span={18}>
                                        <Field
                                            component={AntInput}
                                            name="lookingForAJobDescription"
                                            type="text"
                                            validate={isRequired}
                                        />
                                    </Col>
                                </Row>

                                <Row>
                                    <Col span={6}>
                                        About me*
                                    </Col>
                                    <Col span={18}>
                                        <Field
                                            component={AntInput}
                                            name="aboutMe"
                                            type="text"
                                            validate={isRequired}
                                        />
                                    </Col>
                                </Row>


                                <h3 style={{textAlign: 'center', marginTop: '20px'}}>Contacts:</h3>

                                {(profile !== null) && Object.keys(profile.contacts).map(key => {
                                    return (

                                        <Row>
                                            <Col span={6}>
                                                {key}
                                            </Col>
                                            <Col span={18}>
                                                <Field
                                                    component={AntInput}
                                                    name={['contacts', key]}
                                                    type="text"
                                                />
                                            </Col>
                                        </Row>

                                    )
                                })}
                                <Row justify='center'>
                                    <Button style={{textAlign: 'center'}} htmlType="submit" type="primary" icon={<SaveOutlined />} >Save</Button>
                                </Row>


                            </Form>
                        </Formik>
                </Col>
            </Row>
        </div>
    )
}

export default compose(withAuthRedirect)(Settings)