import Cookies from 'js-cookie'
const tokenKey = 'token'

export function getToken(): string | undefined {
    return Cookies.get(tokenKey)
}

export function setToken(token: string): void {
    Cookies.set(tokenKey, token)
}

export function removeToken(): void {
    Cookies.remove(tokenKey)
}