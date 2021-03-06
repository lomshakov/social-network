import React from 'react'
import 'antd/dist/antd.css'
import './../../App.css'
import {Link} from 'react-router-dom'
import {Avatar, Button, Col, Row, Typography} from 'antd'
import {PoweroffOutlined, UserOutlined} from '@ant-design/icons'
import {useDispatch, useSelector} from 'react-redux'
import {logout} from '../../Redux/auth-reducer'
import {AppStateType} from '../../Redux/redux-store'

const {Text} = Typography

export const MainHeader: React.FC = () => {
    const isAuth = useSelector((state: AppStateType) => state.auth.isAuth)
    const login = useSelector((state: AppStateType) => state.auth.login)

    const dispatch = useDispatch()
    const onLogout = () => {
        dispatch(logout())
    }

    return (
        <Row>
            <Col span={4}>
                <div className="logo"/>
            </Col>

            <Col span={14}>
                <Text style={{color: 'white', fontSize: 25}}>React developers social network
                </Text>
            </Col>

            <Col span={6}>
                {!isAuth ? <Button><Link to='/login'>Login</Link></Button>
                    : <div>
                        <Avatar style={{backgroundColor: '#87d068'}} icon={<UserOutlined/>}/>

                        <Text style={{color: 'white', margin: '0 15px'}}>
                            {login}
                        </Text>

                        <Button icon={<PoweroffOutlined/>} onClick={onLogout}>Logout</Button>
                    </div>}
            </Col>
        </Row>
    )
}