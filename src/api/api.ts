import axios from 'axios'

export const instance = axios.create({
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

export type APIResponseType<D = {}> = {
    data: D
    resultCode: ResultCode
    messages: Array<string>
}