import { classNames } from 'shared/lib/classNames/classNames'
import cls from './LoginForm.module.scss'
import { useTranslation } from 'react-i18next'
import React from 'react'
import { Button, ButtonTheme } from 'shared/ui/Button/Button'
import { Input } from 'shared/ui/Input/Input'

interface LoginFormProps {
  className?: string
}
export const LoginForm: React.FC<LoginFormProps> = ({ className }) => {
  const { t } = useTranslation()

  return (
      <div className={classNames(cls.LoginForm, {}, [className])}>
        <Input autofocus placeholder={t('Введите логин')}/>
        <Input placeholder={t('Введите пароль')}/>
        <Button theme={ButtonTheme.BACKGROUND} className={cls.button}>
          {t('Войти')}
        </Button>
      </div>
  )
}
