import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './AddNewComment.module.scss';
import { useTranslation } from 'react-i18next';
import { Input } from '@/shared/ui/deprecated/Input/Input';
import { Button } from '@/shared/ui/deprecated/Button/Button';
import { useSelector } from 'react-redux';
import { getAddNewCommentText } from '../../model/selectors/addNewCommentSelectors';
import { useCallback } from 'react';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { addNewCommentActions, addNewCommentReducer } from '../../model/slice/addNewCommentSlice';
import { DynamicModuleLoader, ReducersList } from '@/shared/lib/DynamicModuleLoader/DynamicModuleLoader';
import { HStack } from 'src/shared/ui/deprecated/Stack';

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
      <HStack justify={'between'} max className={classNames(cls.AddNewComment, {}, [className])}>
        <Input
          data-testid={'AddCommentForm.Input'}
          className={cls.input}
          value={text}
          onChange={onCommentChange}
          placeholder={t('Введите комментарий')}
        />
        <Button data-testid={'AddCommentForm.Button'} onClick={onSendHandler}>
          {t('Отправить')}
        </Button>
      </HStack>
    </DynamicModuleLoader>
  );
};
