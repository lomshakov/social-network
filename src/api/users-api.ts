import {UsersType} from '../types/types'
import {instance} from './api'
import {APIResponseType} from './api'

type GetUsersResponseType = {
    items: Array<UsersType>
    totalCount: number
    error: string | null
}

export const usersAPI = {
    getUsers(currentPage = 1, pageSize = 10, term = '', friend: null | boolean = null) {
        return instance.get<GetUsersResponseType>(`users?page=${currentPage}&count=${pageSize}&term=${term}` + ((friend !== null) ? `&friend=${friend}` : ''))
            .then(response => response.data)
    },
    follow(userID: number) {
        return instance.post<APIResponseType>(`follow/${userID}`)
            .then(response => response.data)
    },
    unfollow(userID: number) {
        return instance.delete<APIResponseType>(`follow/${userID}`)
            .then(response => response.data)
    }
}