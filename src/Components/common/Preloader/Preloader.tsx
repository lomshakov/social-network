import React from 'react'
import 'antd/dist/antd.css'
import './../../../App.css'
import { Spin, Space } from 'antd'

const Preloader:React.FC = () => {
    return (
        <Space size="large">
            <Spin size="large" />
        </Space>
    )
}

export default Preloader


