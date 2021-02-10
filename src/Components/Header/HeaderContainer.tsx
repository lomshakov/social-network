import React from 'react'
import 'antd/dist/antd.css'
import './../../App.css'
import { Link } from 'react-router-dom'
import { Avatar, Button, Col, Row, Typography } from 'antd'
import {PoweroffOutlined, UserOutlined} from '@ant-design/icons'
import { connect } from 'react-redux'
import { logout } from '../../Redux/auth-reducer'
import { AppStateType } from '../../Redux/redux-store'

const { Text } = Typography

type PropsType = {
    isAuth: boolean
    login: string | null
    logout: () => void
}

const Header: React.FC<PropsType> = ({ isAuth, login, logout }) => {
    return (
        <Row className="header">
            <Col span={4}>
                <div className="logo" />
            </Col>

            <Col span={14}>
                <Text style={{color: 'white', fontSize: 25}}>React developers social network
                </Text>
            </Col>

            <Col span={6}>
                { !isAuth ? <Button><Link to='/login'>Login</Link></Button>
                    : <div>
                        <Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />

                        <Text style={{color: 'white', margin: '0 15px'}}>
                            {login}
                        </Text>

                        <Button icon={<PoweroffOutlined />} onClick={logout}>Logout</Button>
                    </div> }
            </Col>
        </Row>
    )
}

const mapStateToProps = (state: AppStateType) => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login
})

export default connect(mapStateToProps, { logout })(Header)