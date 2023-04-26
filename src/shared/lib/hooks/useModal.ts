import { useCallback, useEffect, useState } from 'react'

interface UseModalProps {
  onClose?: () => void
  isOpen?: boolean
}
export function useModal ({ isOpen, onClose }: UseModalProps) {
  const [isMounted, setIsMounted] = useState(false)
  useEffect(() => {
    if (isOpen) {
      setIsMounted(true)
    }
  }, [isOpen])

  const onKeyDown = useCallback((event: KeyboardEvent) => {
    if (isOpen && event.key === 'Escape') {
      if (onClose) {
        onClose()
      }
    }
  }, [onClose, isOpen])
  useEffect(() => {
    document.body.addEventListener('keydown', onKeyDown)
    return () => {
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [onKeyDown])
  return {
    isMounted
  }
}
