import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:7000',
    withCredentials: true
})

export const register = async ({ username, email, password }) => {
    try {
        const response = await api.post('/api/auth/register', {
            username, email, password
        })
        return response.data;
    } catch (err) {
        console.log("Error while Register", err.message)
        throw err ;
    }
}

export const login = async ({ email, password }) => {
    try {
        const response = await api.post('/api/auth/login', {
            email, password
        })
        return response.data;
    } catch (err) {
        console.log("Error while Login", err.message)
    }
}

export const logout = async () => {
    try {
        const response = await api.get('/api/auth/logout');
        return response.data;
    } catch (error) {
        console.log("Error while Logout", err.message)
    }
}

export const get_Me = async () => {
    try {
        const response = await api.get('api/auth/get-me')
        return response.data;
    } catch (error) {
        console.log("Error while get-me", err.message)
    }
}