import { classNames } from '@/shared/lib/classNames/classNames'
import cls from './Code.module.scss'
import { Text } from '../Text/Text'
import { Button, ButtonTheme } from '../Button/Button'
import CopyIcon from '@/shared/assets/icons/copy.svg'
import { useCallback } from 'react'

interface CodeProps {
  className?: string
  text: string
}

export const Code = ({ className, text }: CodeProps) => {
  const onCopy = useCallback(() => {
    navigator.clipboard.writeText(text)
  }, [text])
  return (
      <pre className={classNames(cls.Code, {}, [className])}>
        <Button onClick={onCopy} theme={ButtonTheme.CLEAR} className={cls.button}>
          <CopyIcon className={cls.copy}/>
        </Button>
        <code>
          <Text text={text}/>
        </code>
      </pre>

  )
}
