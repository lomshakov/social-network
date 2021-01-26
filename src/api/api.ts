import axios from 'axios'
import {PhotosType, ProfileType, ProfileTypeForSave, UsersType} from '../types/types'

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    withCredentials: true,
    headers: {
        "API-KEY": "8d451412-d505-42b4-be18-7644933e3dfb"
    }
})

export enum ResultCode {
    Success = 0,
    Error = 1,
    CaptchaIsRequried = 10
}


type GetUsersResponseType = {
    items: Array<UsersType>
    totalCount: number
    error: string | null
}

type FollowUnfollowResponseType = {
    data: object
    resultCode: ResultCode
    messages: Array<string>
}

export const usersAPI = {
    getUsers(currentPage = 1, pageSize = 10) {
        return instance.get<GetUsersResponseType>(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => response.data)
    },
    follow(userID: number) {
        return instance.post<FollowUnfollowResponseType>(`follow/${userID}`)
            .then(response => response.data)
    },
    unfollow(userID: number) {
        return instance.delete<FollowUnfollowResponseType>(`follow/${userID}`)
            .then(response => response.data)
    }
}

type UpdateStatusResponseType = {
    data: object
    resultCode: ResultCode
    messages: Array<string>
}

type SavePhotoResponseType = {
    data: PhotosType
    resultCode: ResultCode
    messages: Array<string>
}

type SaveProfileResponseType = {
    data: PhotosType
    resultCode: ResultCode
    messages: Array<string>
}

export const profileAPI = {
    getProfileData(userID: number | null) {
        return instance.get<ProfileType>(`profile/` + userID)
            .then(response => response.data)
    },
    getStatus(userID: number) {
        return instance.get<string>('profile/status/' + userID)
            .then(response => response.data)
    },
    updateStatus(status: string) {
        return instance.put<UpdateStatusResponseType>('profile/status/', { status: status })
            .then(response => response.data)
    },
    savePhoto(image: any) {
        const formData = new FormData();
        formData.append("image", image);
        return instance.put<SavePhotoResponseType>('profile/photo', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(response => response.data)
    },
    saveProfile(profile: ProfileTypeForSave) {
        return instance.put<SaveProfileResponseType>('profile', profile)
            .then(response => response.data)
    }
}

type MeResponseType = {
    data: { id: number, email: string, login: string }
    resultCode: ResultCode
    messages: Array<string>
}

type LoginResponseType = {
    data: { userId: number }
    resultCode: ResultCode
    messages: Array<string>
}

type LogoutResponseType = {
    data: object
    resultCode: ResultCode
    messages: Array<string>
}

export const authAPI = {
    getAuthData() {
        return instance.get<MeResponseType>(`auth/me`)
            .then(response => response.data)
    },
    login(email: string, password: string, rememberMe = false, captcha: null | string = null) {
        return instance.post<LoginResponseType>('auth/login', {email, password, rememberMe, captcha})
            .then(response => response.data)
    },
    logout() {
        return instance.delete<LogoutResponseType>('auth/login')
            .then(response => response.data)
    }
}

type CaptchaResponseType = {
    url: string
}

export const securityAPI = {
    getCaptchaUrl() {
        return instance.get<CaptchaResponseType>('security/get-captcha-url')
            .then(response => response.data)
    }
}
