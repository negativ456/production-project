import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './LoginForm.module.scss';
import { useTranslation } from 'react-i18next';
import React, { useCallback } from 'react';
import { Button as ButtonDeprecated, ButtonTheme } from '@/shared/ui/deprecated/Button/Button';
import { Button } from '@/shared/ui/redesigned/Button/Button';
import { Input as InputDeprecated } from '@/shared/ui/deprecated/Input/Input';
import { Input } from '@/shared/ui/redesigned/Input/Input';
import { useSelector } from 'react-redux';
import { loginActions, loginReducer } from '../../model/slice/loginSlice';
import { loginByUsername } from '../../model/services/loginByUsername/loginByUsername';
import { Text as TextDeprecated, TextTheme } from '@/shared/ui/deprecated/Text/Text';
import { Text } from '@/shared/ui/redesigned/Text/Text';
import { getLoginUsername } from '../../model/selectors/getLoginUsername/getLoginUsername';
import { getLoginPassword } from '../../model/selectors/getLoginPassword/getLoginPassword';
import { getLoginLoading } from '../../model/selectors/getLoginLoading/getLoginLoading';
import { getLoginError } from '../../model/selectors/getLoginError/getLoginError';
import { DynamicModuleLoader, ReducersList } from '@/shared/lib/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { ToggleFeatures } from '@/shared/lib/features';
import { VStack } from '@/shared/ui/redesigned/Stack';

interface LoginFormProps {
  className?: string;
  onSuccess: () => void;
}
const initialReducers: ReducersList = {
  loginForm: loginReducer,
};
const LoginForm: React.FC<LoginFormProps> = ({ className, onSuccess }) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const username = useSelector(getLoginUsername);
  const password = useSelector(getLoginPassword);
  const isLoading = useSelector(getLoginLoading);
  const error = useSelector(getLoginError);

  const onChangeUsername = useCallback(
    (value: string) => {
      dispatch(loginActions.setUsername(value));
    },
    [dispatch]
  );
  const onChangePassword = useCallback(
    (value: string) => {
      dispatch(loginActions.setPassword(value));
    },
    [dispatch]
  );

  const onLoginClick = useCallback(async () => {
    if (username && password) {
      const result = await dispatch(loginByUsername({ username, password }));
      if (result.meta.requestStatus === 'fulfilled') {
        onSuccess();
      }
    }
    window.location.reload();
  }, [dispatch, onSuccess, password, username]);

  return (
    <DynamicModuleLoader reducers={initialReducers} removeAfterUnmount>
      <ToggleFeatures
        feature={'isAppRedesigned'}
        on={
          <VStack gap={'16'} className={className}>
            <Text title={t('Форма авторизации')} />
            {error && <Text variant={'error'} text={t('Неправильный логин или пароль')} />}
            <Input value={username ?? ''} onChange={onChangeUsername} autofocus placeholder={t('Введите логин')} />
            <Input value={password ?? ''} onChange={onChangePassword} placeholder={t('Введите пароль')} />
            <Button onClick={onLoginClick} variant={'outline'} className={cls.button} disabled={isLoading}>
              {t('Войти')}
            </Button>
          </VStack>
        }
        off={
          <div className={classNames(cls.LoginForm, {}, [className])}>
            <TextDeprecated title={t('Форма авторизации')} />
            {error && <TextDeprecated theme={TextTheme.ERROR} text={t('Неправильный логин или пароль')} />}
            <InputDeprecated
              value={username ?? ''}
              onChange={onChangeUsername}
              autofocus
              placeholder={t('Введите логин')}
            />
            <InputDeprecated value={password ?? ''} onChange={onChangePassword} placeholder={t('Введите пароль')} />
            <ButtonDeprecated
              onClick={onLoginClick}
              theme={ButtonTheme.OUTLINE}
              className={cls.button}
              disabled={isLoading}>
              {t('Войти')}
            </ButtonDeprecated>
          </div>
        }
      />
    </DynamicModuleLoader>
  );
};
export default LoginForm;
