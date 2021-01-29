import React from 'react'
import { Button, Upload } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import 'antd/dist/antd.css'

type PropsType = {

}

const ButtonUpload: React.FC<PropsType> = (props) => {
    return (
        <Upload {...props}>
            <Button icon={<UploadOutlined />}>Click to Upload</Button>
        </Upload>
    )
}

export default ButtonUpload