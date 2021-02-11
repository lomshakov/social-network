import React from 'react'
import {Layout, Menu} from 'antd'
import {Link} from 'react-router-dom'

const {Sider} = Layout

export const SiderMenu: React.FC = () => {
    return (
        <Sider width={200} className="site-layout-background">
            <Menu
                mode="inline"
                defaultSelectedKeys={['1']}
                style={{height: '100%', borderRight: 0}}>

                <Menu.Item key="1">
                    <Link to='/profile'>My profile</Link>
                </Menu.Item>

                <Menu.Item key="2">
                    <Link to='/chat'>Chat</Link>
                </Menu.Item>

                <Menu.Item key="3">
                    <Link to='/news'>News</Link>
                </Menu.Item>

                <Menu.Item key="4">
                    <Link to='/music'>Music</Link>
                </Menu.Item>

                <Menu.Item key="5">
                    <Link to='/settings'>Settings</Link>
                </Menu.Item>

                <Menu.Item key="6">
                    <Link to='/users'>Developers</Link>
                </Menu.Item>
            </Menu>
        </Sider>
    )
}