import usersReducer, {InitialStateType, actions, follow, unfollow} from './users-reducer'
import {usersAPI} from '../api/users-api'
import {APIResponseType, ResultCode} from '../api/api'

const usersAPIMock = usersAPI as jest.Mocked<typeof usersAPI>
jest.mock('../api/users-api')
const dispatchMock = jest.fn()
const getStateMock = jest.fn()


const result: APIResponseType = {
    resultCode: ResultCode.Success,
    messages: [],
    data: {}
}

let state: InitialStateType

beforeEach(() => {
    dispatchMock.mockClear()
    getStateMock.mockClear()
    usersAPIMock.follow.mockClear()
    usersAPIMock.unfollow.mockClear()

    state = {
        users: [
            {id: 0, name: 'Dmitry', followed: false, status: 'Status', photos: {small: '', large: ''}},
            {id: 1, name: 'Alex', followed: false, status: 'Status', photos: {small: '', large: ''}},
            {id: 2, name: 'Max', followed: true, status: 'Status', photos: {small: '', large: ''}},
            {id: 3, name: 'Olga', followed: false, status: 'Status', photos: {small: '', large: ''}}
        ],
        pageSize: 10,
        totalUsersCount: 0,
        currentPage: 1,
        isFetching: false,
        followingInProgress: []
    }
})

describe('Testing actions-creators', () => {
    test('Follow completed successfully', () => {
        const newState = usersReducer(state, actions.followSuccess(1))
        expect(newState.users[0].followed).toBeFalsy()
        expect(newState.users[1].followed).toBeTruthy()
        expect(newState.users[2].followed).toBeTruthy()
        expect(newState.users[3].followed).toBeFalsy()
    })

    test('Unfollow completed successfully', () => {
        const newState = usersReducer(state, actions.unfollowSuccess(2))
        expect(newState.users[0].followed).toBeFalsy()
        expect(newState.users[1].followed).toBeFalsy()
        expect(newState.users[2].followed).toBeFalsy()
        expect(newState.users[3].followed).toBeFalsy()
    })
})

describe('Testing thunks-creators', () => {
    test('Follow thunk success', async () => {
        usersAPIMock.follow.mockReturnValue(Promise.resolve(result))

        const thunk = follow(1)

        await thunk(dispatchMock, getStateMock, {})
        expect(dispatchMock).toBeCalledTimes(3)
        expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.toggleIsFollowing(true, 1))
        expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.followSuccess(1))
        expect(dispatchMock).toHaveBeenNthCalledWith(3, actions.toggleIsFollowing(false, 1))
    })

    test('Unfollow thunk success', async () => {
        usersAPIMock.unfollow.mockReturnValue(Promise.resolve(result))

        const thunk = unfollow(1)

        await thunk(dispatchMock, getStateMock, {})
        expect(dispatchMock).toBeCalledTimes(3)
        expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.toggleIsFollowing(true, 1))
        expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.unfollowSuccess(1))
        expect(dispatchMock).toHaveBeenNthCalledWith(3, actions.toggleIsFollowing(false, 1))
    })
})