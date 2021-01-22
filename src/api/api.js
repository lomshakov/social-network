import axios from "axios";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    withCredentials: true,
    headers: {
        "API-KEY": "8d451412-d505-42b4-be18-7644933e3dfb"
    }
});

export const usersAPI = {
    getUsers(currentPage = 1, pageSize = 10) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => response.data)
    },
    follow(userID) {
        return instance.post(`follow/${userID}`)
    },
    unfollow(userID) {
        return instance.delete(`follow/${userID}`)
    }
}

export const profileAPI = {
    getProfileData(userID) {
        return instance.get(`profile/` + userID)
    },
    getStatus(userID) {
        return instance.get('profile/status/' + userID)
    },
    updateStatus(status) {
        return instance.put('profile/status/', { status: status })
    },
    savePhoto(image) {
        const formData = new FormData();
        formData.append("image", image);
        return instance.put('profile/photo', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    },
    saveProfile(profile) {
        return instance.put('profile', profile)
    }
}

export const authAPI = {
    getAuthData() {
        return instance.get(`auth/me`)
    },
    login(email, password, rememberMe = false) {
        return instance.post('auth/login', {email, password, rememberMe})
    },
    logout() {
        return instance.delete('auth/login')
    }
}
