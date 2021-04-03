import axios from 'axios';


const _baseUrl = "https://localhost:44307/account";

export async function loginAsync(code) {
    const response = await axios.post(`${_baseUrl}/login`, {code})
    
    if (response) {
        setTokens(response.data)
        localStorage.setItem('refreshToken', response.data.refreshToken)
        window.history.pushState({}, null, "/dashboard")
        return response.data.accessToken
    }
    else {
        window.location = "/"
        return null
    }
}

export async function refreshTokenAsync() {
    const refreshToken = localStorage.getItem('refreshToken')
    const response = await axios.post(`${_baseUrl}/refresh`, {refreshToken})
    
    if (response) {
        setTokens(response.data)
        window.history.pushState({}, null, "/dashboard")
        return response.data.accessToken
    }
    else {
        window.location = "/"
        return null
    }
}

export function isAuthenticated() {
    const token = localStorage.getItem('accessToken')
    if (token && !isTokenExpired()) {
        return token;
    }

    return null;
}

export function logout() {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    localStorage.removeItem('expiresIn')
    localStorage.removeItem('expireDate')
}

function setTokens(data) {
    localStorage.setItem('accessToken', data.accessToken)
    localStorage.setItem('expiresIn', data.expiresIn)

    let now = new Date();
    let expiryDate = new Date(now.getTime() + data.expiresIn * 1000);
    localStorage.setItem('expireDate', expiryDate)
}

function isTokenExpired() {
    const expiryDate = Date.parse(localStorage.getItem('expireDate'))
    if (Date.now() > expiryDate) {
        logout()
        return true
    }

    return false
}