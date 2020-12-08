let state = {
    messagePage: {
        dialogs: [{id: 1, name: 'Dmitry'},
            {id: 2, name: 'Alex'},
            {id: 3, name: 'Sveta'},
            {id: 4, name: 'Anna'}],

        messages: [{id: 1, message: 'Hi!!'},
            {id: 2, message: 'Ok))'},
            {id: 3, message: 'Good Day!))'},
            {id: 4, message: 'Fuck....'}]
    },

    profilePage: {
        posts: [{id: 1, message: 'Hi to all!!!', likesCount: 15},
            {id: 2, message: 'Hello World', likesCount: 7},
            {id: 3, message: 'This is network', likesCount: 84},
            {id: 4, message: 'Fuck....uuu', likesCount: 11}]
    },

    sidebar: {
        friends: [
            {id:1, name: 'Andrew', avatarUrl: 'https://whatsism.com/uploads/posts/2018-07/1530546770_rmk_vdjbx10.jpg'},
            {id:2, name: 'Dmitry', avatarUrl: 'https://pm1.narvii.com/6889/74979d4d2744ec6e27995b6e866f091d04c0b40cr1-515-414v2_hq.jpg'}
        ]
    }
};

export default state;