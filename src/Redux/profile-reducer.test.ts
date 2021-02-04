import profileReducer, {actions} from './profile-reducer'

let state = {
    posts: [{id: 1, message: 'Hi to all!!!', likesCount: 15, date: '09.06.2019, 15:09:26'},
        {id: 2, message: 'Hello World', likesCount: 7, date: '16.02.2020, 03:54:26'},
        {id: 3, message: 'This is network', likesCount: 84, date: '30.06.2020, 10:12:26'},
        {id: 4, message: 'Fuck....uuu', likesCount: 11, date: '01.12.2020, 23:00:26'}
    ],
    profile: null,
    status: '',
    profileChangeError: ''
}

test('Message should added', () => {
    let action = actions.addPost("new message");
    expect(profileReducer(state, action).posts.length).toBe(5);
})

test('Message text should be correct', () => {
    let action = actions.addPost("new message");
    expect(profileReducer(state, action).posts[4].message).toBe("new message");
})

test('Likes count for a new message should be 0', () => {
    let action = actions.addPost("new message");
    expect(profileReducer(state, action).posts[4].likesCount).toBe(0);
})

test('Number of messages after delete should decrease', () => {
    let action = actions.deletePost(1);
    expect(profileReducer(state, action).posts.length).toBe(3);
})

test(`Number of messages don't decrease if ID of post is incorrect`, () => {
    let action = actions.deletePost(1000);
    expect(profileReducer(state, action).posts.length).toBe(4);
})