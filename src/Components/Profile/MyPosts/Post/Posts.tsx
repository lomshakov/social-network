import React from 'react'
import { connect } from 'react-redux'
import { AppStateType } from '../../../../Redux/redux-store'
import { PostType } from '../../../../types/types'
import { Avatar, List, Space } from 'antd'
import { FieldTimeOutlined, LikeOutlined, StarOutlined } from '@ant-design/icons'

type PropsType = {
    posts: Array<PostType>
    login: string | null
}

const IconText: React.FC<{ icon: any, text: any }> = ({ icon, text }) => {
    return (
        <Space>
            {React.createElement(icon)}
            {text}
        </Space>
    )
}

const Posts: React.FC<PropsType> = React.memo(({ login, posts }) => {
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


// type MapStateToPropsType = {
//     posts: Array<PostType>
//     login: string | null
// }
//
// let mapStateToProps = (state: AppStateType): MapStateToPropsType => {
//     return {
//         posts: state.profilePage.posts,
//         login: state.auth.login
//     }
// }
//
// let PostsContainer = connect(mapStateToProps, null)(Posts)

export default Posts