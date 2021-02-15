import React from 'react'
import {useSelector} from 'react-redux'
import {Avatar, List, Space} from 'antd'
import {FieldTimeOutlined, LikeOutlined, StarOutlined} from '@ant-design/icons'
import {getLoginSelector} from '../../../Redux/auth-selectors'
import {getPostsSelector} from '../../../Redux/profile-selectors'

const IconText: React.FC<{ icon: any, text: any }> = ({ icon, text }) => {
    return (
        <Space>
            {React.createElement(icon)}
            {text}
        </Space>
    )
}

export const Posts: React.FC = React.memo(() => {

    const login = useSelector(getLoginSelector)
    const posts = useSelector(getPostsSelector)

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
            dataSource={posts}

            renderItem={ (item: any) => (
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
})