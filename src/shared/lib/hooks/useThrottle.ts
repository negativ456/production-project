import { useCallback, useRef } from 'react'

export function useThrottle<T> (func: (...args: T[]) => void, delay: number) {
  const isReady = useRef(false)
  return useCallback((...args: T[]) => {
    if (!isReady.current) {
      isReady.current = true
      func(...args)
      setTimeout(() => {
        isReady.current = false
      }, delay)
    }
  }, [func, delay])
}
