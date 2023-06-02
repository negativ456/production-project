import { useTranslation } from 'react-i18next';
import { Modal } from '@/shared/ui/deprecated/Modal/Modal';
import { useEffect, useState } from 'react';
import { Text } from '@/shared/ui/deprecated/Text/Text';
import { saveJsonSettings, useJsonSettings } from '@/entities/User';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';

interface ArticlePageGreetingProps {
  className?: string;
}

export const ArticlePageGreeting = ({ className }: ArticlePageGreetingProps) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const { isArticlePageWasOpened } = useJsonSettings();
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (!isArticlePageWasOpened) {
      setIsOpen(true);
      dispatch(saveJsonSettings({ isArticlePageWasOpened: true }));
    }
  }, [dispatch, isArticlePageWasOpened]);

  const onClose = () => {
    console.log('close');
    setIsOpen(false);
  };
  return (
    <Modal open={isOpen} onClose={onClose}>
      <Text
        title={t('Добро пожаловать на страницу статей')}
        text={t('Здесь вы можете искать и просматривать статьи на различные темы')}
      />
    </Modal>
  );
};
