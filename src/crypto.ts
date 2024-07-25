import CryptoJS from 'crypto-js'

const secretKey = import.meta.env.VITE_APP_SECRET_KEY

export const decryptedData = (value: string) => CryptoJS.AES.decrypt(value, secretKey).toString(CryptoJS.enc.Utf8)

export const encryptedData = (value: string) => CryptoJS.AES.encrypt(JSON.stringify(value), secretKey).toString()
