import { useState, useEffect } from 'react'

const getSavedValue = (key, initialValue) => {
  const savedValue = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem(key)) : ""
  if (savedValue) return savedValue

  if (savedValue instanceof Function) return initialValue()
  return initialValue
}


const useLocalStorage = (key, initialValue) => {
  const [value, setValue] = useState(()=>{
    return getSavedValue(key, initialValue)
  })

  useEffect(() => {
    if (typeof window !== 'undefined' && value)
      localStorage.setItem(key, JSON.stringify(value))
    if (typeof window !== 'undefined' && !value)
      localStorage.removeItem(key)
  }, [value])

  return [value, setValue]

}

export default useLocalStorage;