import {PhotosType, ProfileType, ProfileTypeForSave} from '../types/types'
import {instance, ResultCode, APIResponseType} from './api'

type PhotosResponseDataType = {
    photos: PhotosType
}

export const profileAPI = {
    getProfileData(userID: number | null) {
        return instance.get<ProfileType>(`profile/` + userID)
            .then(response => response.data)
    },
    getStatus(userID: number | null) {
        return instance.get<string>('profile/status/' + userID)
            .then(response => response.data)
    },
    updateStatus(status: string) {
        return instance.put<APIResponseType>('profile/status/', { status: status })
            .then(response => response.data)
    },
    savePhoto(image: File) {
        const formData = new FormData();
        formData.append("image", image);
        return instance.put<APIResponseType<PhotosResponseDataType>>('profile/photo', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(response => response.data)
    },
    saveProfile(profile: ProfileTypeForSave) {
        return instance.put<APIResponseType<PhotosResponseDataType>>('profile', profile)
            .then(response => response.data)
    }
}