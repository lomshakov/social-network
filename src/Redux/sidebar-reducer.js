let initialState = {
    friends: [
        {
            id: 1,
            name: 'Andrew',
            avatarUrl: 'https://whatsism.com/uploads/posts/2018-07/1530546770_rmk_vdjbx10.jpg'
        },
        {
            id: 2,
            name: 'Dmitry',
            avatarUrl: 'https://pm1.narvii.com/6889/74979d4d2744ec6e27995b6e866f091d04c0b40cr1-515-414v2_hq.jpg'
        }
    ]
};

const sidebarReducer = (state = initialState, action) => {

    return state;
};

export default sidebarReducer;