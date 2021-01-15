import 'antd/dist/antd.css';
import './../../App.css'
import {Link} from "react-router-dom";
import {Avatar, Button, Col, Row, Typography } from "antd";
import { UserOutlined } from '@ant-design/icons';

const {Text} = Typography;

const Header = (props) => {
    return (
            <Row className="header">
                <Col span={4}>
                    <div className="logo" />
                </Col>

                <Col span={14}>
                    <Text style={{color: 'white', fontSize: 30}}>React developers social network
                    </Text>
                </Col>

                <Col span={6}>
                    { !props.isAuth ? <Button><Link to='/login'>Login</Link></Button>
                                    : <div>
                                        <Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />

                                        <Text style={{color: 'white', margin: '0 15px'}}>
                                            {props.login}
                                        </Text>

                                        <Button onClick={props.logout}>Logout</Button>
                                      </div> }
                </Col>
            </Row>
    )
};

export default Header;