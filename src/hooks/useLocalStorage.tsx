import { useState, useEffect } from 'react'
import { useAppState } from '../context/AppState'
import { decryptedData, encryptedData } from '../crypto'

export default function useLocalStorage(key: string, initialValue: string[]) {
  const {
    state: { authorizedUser },
  } = useAppState()

  const prefixedKey = `${authorizedUser?.uid}-${key}`

  const [value, setValue] = useState(() => {
    const storedValue = localStorage.getItem(prefixedKey)
    if (storedValue) {
      try {
        const data = decryptedData(storedValue)
        return JSON.parse(data)
      } catch (error) {
        return initialValue
      }
    }
    return initialValue
  })

  useEffect(() => {
    const data = encryptedData(value)
    localStorage.setItem(prefixedKey, data)
  }, [prefixedKey, value])

  return [value, setValue]
}
