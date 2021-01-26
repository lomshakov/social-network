export type PostType = {
    id: number
    message: string
    likesCount: number
    date: string
}

export type PhotosType = {
    small: string | null
    large: string | null
}

export type ContactsType ={
    facebook: string
    website: string
    vk: string
    twitter: string
    instagram: string
    youtube: string
    github: string
    mainLink: string
}

export type ProfileType = {
    userId: number
    fullName: string
    lookingForAJob: boolean
    lookingForAJobDescription: string
    aboutMe: string
    photos: PhotosType
    contacts: ContactsType
}

export type ProfileTypeForSave = {
    userId: number
    fullName: string
    lookingForAJob: boolean
    lookingForAJobDescription: string
    aboutMe: string
    contacts: ContactsType
}

export type UsersType = {
    id: number
    name: string
    status: string
    photos: PhotosType
    followed: boolean
}

export type DialogType = {
    id: number
    name: string
}

export type MessageType = {
    id: number
    message: string
}