import React, { useEffect, useState } from 'react'
import { Button } from 'shared/ui/Button/Button'
interface BugButtonProps {
  className?: string
}
export const BugButton: React.FC<BugButtonProps> = () => {
  const [error, setError] = useState(false)

  const throwError = () => {
    setError(true)
  }
  useEffect(() => {
    if (error) {
      throw new Error()
    }
  }, [error])
  return (
      <Button onClick={throwError} >
        throw error
      </Button>
  )
}
