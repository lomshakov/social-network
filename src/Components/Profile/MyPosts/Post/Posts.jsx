import * as React from "react";
import { List, Avatar, Space } from 'antd';
import { FieldTimeOutlined, LikeOutlined, StarOutlined } from '@ant-design/icons';


const Posts = (props) => {

    const IconText = ({ icon, text }) => (
        <Space>
            {React.createElement(icon)}
            {text}
        </Space>
    );

    const login = props.login

    return (
        <List
            itemLayout="vertical"
            size="large"
            pagination={{
                onChange: page => {
                    console.log(page);
                },
                pageSize: 10,
            }}
            dataSource={props.posts}

            renderItem={item => (
                <List.Item
                    key={item.id}
                    actions={[
                        <IconText icon={StarOutlined} text="156" key="list-vertical-star-o" />,
                        <IconText icon={LikeOutlined} text={item.likesCount} key="list-vertical-like-o" />,
                        <IconText icon={FieldTimeOutlined} text={item.date} key="list-vertical-message" />,
                    ]}

                >
                    <List.Item.Meta
                        avatar={<Avatar src={item.avatar} />}
                        title={login}
                        description={item.message}
                    />
                    {item.content}
                </List.Item>
            )}
        />
    )
};

export default Posts;