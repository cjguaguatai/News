import storage from './storage'
const key = 'userToken'
export const getToken = () => storage.get(key)
export const setToken = (token) => storage.set(key, token)
export const removeToken = () => storage.get(key)
