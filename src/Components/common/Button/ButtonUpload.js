import {Button, Upload} from "antd";
import {UploadOutlined} from "@ant-design/icons";
import 'antd/dist/antd.css';

const ButtonUpload = (props) => {
    return (
        <Upload {...props}>
            <Button icon={<UploadOutlined />}>Click to Upload</Button>
        </Upload>
    )
}

export default ButtonUpload;