import {instance} from './api'

type CaptchaResponseType = {
    url: string
}

export const securityAPI = {
    getCaptchaUrl() {
        return instance.get<CaptchaResponseType>('security/get-captcha-url')
            .then(response => response.data)
    }
}