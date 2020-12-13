const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';

let initialState = {
    users: [
        {id: 1, avatarUrl: 'https://illustrators.ru/uploads/illustration/image/1232594/main_%D1%8B%D1%8B%D1%8B%D1%8B.png', followed: true, fullName: 'Dmitry', status: 'Good day to all!', location: {country: 'Russia', city: 'Moscow'}},
        {id: 2, avatarUrl: 'https://illustrators.ru/uploads/illustration/image/1289811/main_%D1%87%D1%83%D1%80%D0%BA%D0%B0.png', followed: false, fullName: 'Alexey', status: 'Good day to all!', location: {country: 'Russia', city: 'Samara'}},
        {id: 3, avatarUrl: 'https://illustrators.ru/uploads/illustration/image/1289812/main_%D1%87%D0%B5%D1%80.jpg', followed: true, fullName: 'Maxim', status: 'Good day to all!', location: {country: 'Russia', city: 'Kemerovo'}},
        {id: 4, avatarUrl: 'https://illustrators.ru/uploads/illustration/image/1289814/main_%D0%9D%D0%BE%D0%B2%D1%8B%D0%B9%D0%A5%D0%BE%D0%BB%D1%81%D1%821%D0%BC%D0%B0%D1%81%D0%BA%D0%B0.jpg', followed: true, fullName: 'Andrew', status: 'Good day to all!', location: {country: 'Belarus', city: 'Minsk'}},
        {id: 5, avatarUrl: 'https://illustrators.ru/uploads/illustration/image/1289815/main_%D0%BF%D0%B8%D1%80%D0%B0%D1%824.jpg', followed: false, fullName: 'Svetlana', status: 'Good day to all!', location: {country: 'Russia', city: 'Novosibirsk'}}
    ]
};

const usersReducer = (state= initialState, action) => {

    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users: state.users.map( u => {
                    if (u.id === action.userId) {
                        return {...u, followed: true}
                    }
                    return u;
                })
            }
        case UNFOLLOW:
            return {
                ...state,
                users: state.users.map( u => {
                    if (u.id === action.userId) {
                        return {...u, followed: false}
                    }
                    return u;
                })
            }
        case SET_USERS:
            return {...state, users: [...state.users, ...action.users]}
        default:
            return state;
    }
};

export const followAC = (userId) => ({type: FOLLOW, userId});
export const unfollowAC = (userId) => ({type: UNFOLLOW, userId});
export const setUsersAC = (users) => ({type: SET_USERS, users});

export default usersReducer;