import { useState, useEffect } from 'react'
import { useAppState } from '../context/AppState'

export default function useLocalStorage(key: string, initialValue: string[]) {
  const {
    state: { authorizedUser },
  } = useAppState()

  const prefixedKey = `${authorizedUser?.email}-${key}`

  const [value, setValue] = useState(() => {
    const storedValue = localStorage.getItem(prefixedKey)
    return storedValue ? JSON.parse(storedValue) : initialValue
  })

  useEffect(() => {
    localStorage.setItem(prefixedKey, JSON.stringify(value))
  }, [prefixedKey, value])

  return [value, setValue]
}
