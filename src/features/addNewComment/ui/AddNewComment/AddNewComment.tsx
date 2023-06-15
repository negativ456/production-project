import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './AddNewComment.module.scss';
import { useTranslation } from 'react-i18next';
import { Input as InputDeprecated } from '@/shared/ui/deprecated/Input/Input';
import { Input } from '@/shared/ui/redesigned/Input/Input';
import { Button as ButtonDeprecated } from '@/shared/ui/deprecated/Button/Button';
import { Button } from '@/shared/ui/redesigned/Button/Button';
import { useSelector } from 'react-redux';
import { getAddNewCommentText } from '../../model/selectors/addNewCommentSelectors';
import { useCallback } from 'react';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { addNewCommentActions, addNewCommentReducer } from '../../model/slice/addNewCommentSlice';
import { DynamicModuleLoader, ReducersList } from '@/shared/lib/DynamicModuleLoader/DynamicModuleLoader';
import { HStack } from '@/shared/ui/redesigned/Stack';
import { ToggleFeatures } from '@/shared/lib/features';
import { Card } from '@/shared/ui/redesigned/Card/Card';

interface AddNewCommentProps {
  className?: string;
  onSendComment: (text: string) => void;
}
const reducers: ReducersList = {
  addNewComment: addNewCommentReducer,
};
export const AddNewComment = ({ className, onSendComment }: AddNewCommentProps) => {
  const { t } = useTranslation();
  const text = useSelector(getAddNewCommentText);
  // const error = useSelector(getAddNewCommentError)
  const dispatch = useAppDispatch();
  const onCommentChange = useCallback(
    (value: string) => {
      dispatch(addNewCommentActions.setText(value));
    },
    [dispatch]
  );
  const onSendHandler = useCallback(() => {
    onSendComment(text ?? '');
    onCommentChange('');
  }, [onCommentChange, onSendComment, text]);
  return (
    <DynamicModuleLoader reducers={reducers}>
      <ToggleFeatures
        feature={'isAppRedesigned'}
        on={
          <Card padding={'24'} borderRadius={'40'} max>
            <HStack justify={'between'} max className={classNames(cls.AddNewCommentRedesigned, {}, [className])}>
              <Input
                data-testid={'AddCommentForm.Input'}
                className={cls.input}
                value={text}
                onChange={onCommentChange}
                placeholder={t('Введите комментарий')}
              />
              <Button variant={'outline'} data-testid={'AddCommentForm.Button'} onClick={onSendHandler}>
                {t('Отправить')}
              </Button>
            </HStack>
          </Card>
        }
        off={
          <HStack justify={'between'} max className={classNames(cls.AddNewComment, {}, [className])}>
            <InputDeprecated
              data-testid={'AddCommentForm.Input'}
              className={cls.input}
              value={text}
              onChange={onCommentChange}
              placeholder={t('Введите комментарий')}
            />
            <ButtonDeprecated data-testid={'AddCommentForm.Button'} onClick={onSendHandler}>
              {t('Отправить')}
            </ButtonDeprecated>
          </HStack>
        }
      />
    </DynamicModuleLoader>
  );
};
