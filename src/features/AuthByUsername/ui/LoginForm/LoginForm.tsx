import { classNames } from 'shared/lib/classNames/classNames'
import cls from './LoginForm.module.scss'
import { useTranslation } from 'react-i18next'
import React, { useCallback } from 'react'
import { Button, ButtonTheme } from 'shared/ui/Button/Button'
import { Loader } from 'shared/ui/Loader/Loader'
import { Input } from 'shared/ui/Input/Input'
import { useDispatch, useSelector } from 'react-redux'
import { loginActions, loginReducer } from '../../model/slice/loginSlice'
import { loginByUsername } from 'features/AuthByUsername/model/services/loginByUsername/loginByUsername'
import { Text, TextTheme } from 'shared/ui/Text/Text'
import { getLoginUsername } from '../../model/selectors/getLoginUsername/getLoginUsername'
import { getLoginPassword } from '../../model/selectors/getLoginPassword/getLoginPassword'
import { getLoginLoading } from '../../model/selectors/getLoginLoading/getLoginLoading'
import { getLoginError } from '../../model/selectors/getLoginError/getLoginError'
import { DynamicModuleLoader, ReducersList } from 'shared/lib/DynamicModuleLoader/DynamicModuleLoader'

interface LoginFormProps {
  className?: string
}
const initialReducers: ReducersList = {
  loginForm: loginReducer
}
const LoginForm: React.FC<LoginFormProps> = ({ className }) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const username = useSelector(getLoginUsername)
  const password = useSelector(getLoginPassword)
  const isLoading = useSelector(getLoginLoading)
  const error = useSelector(getLoginError)

  const onChangeUsername = useCallback((value: string) => {
    dispatch(loginActions.setUsername(value))
  }, [dispatch])
  const onChangePassword = useCallback((value: string) => {
    dispatch(loginActions.setPassword(value))
  }, [dispatch])

  const onLoginClick = useCallback(() => {
    if (username && password) {
      dispatch(loginByUsername({ username, password }))
    }
  }, [dispatch, password, username])

  return (
      <DynamicModuleLoader reducers={initialReducers} removeAfterUnmount>
        <div className={classNames(cls.LoginForm, {}, [className])}>
          <Text title={t('Форма авторизации')}/>
          {error && <Text theme={TextTheme.ERROR} text={t('Неправильный логин или пароль')}/>}
          <Input value={username} onChange={onChangeUsername} autofocus placeholder={t('Введите логин')}/>
          <Input value={password} onChange={onChangePassword} placeholder={t('Введите пароль')}/>
          <Button
              onClick={onLoginClick}
              theme={ButtonTheme.OUTLINE}
              className={cls.button}
              disabled={isLoading}
          >
            {isLoading ? <Loader className={cls.loader}/> : t('Войти')}
          </Button>
        </div>
      </DynamicModuleLoader>

  )
}
export default LoginForm
