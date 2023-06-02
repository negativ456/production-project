import { classNames } from '@/shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { Card } from '@/shared/ui/deprecated/Card/Card';
import { HStack, VStack } from 'src/shared/ui/deprecated/Stack';
import { Text } from '@/shared/ui/deprecated/Text/Text';
import { StarRating } from '@/shared/ui/deprecated/StarRating/StarRating';
import { Modal } from '@/shared/ui/deprecated/Modal/Modal';
import { Input } from '@/shared/ui/deprecated/Input/Input';
import { useCallback, useState } from 'react';
import { Button, ButtonTheme } from '@/shared/ui/deprecated/Button/Button';
import { isMobile } from '@/shared/lib/detectDevice/detectDevice';
import { Drawer } from '@/shared/ui/deprecated/Drawer/Drawer';

interface RatingCardProps {
  className?: string;
  title?: string;
  feedbackTitle?: string;
  hasFeedback?: boolean;
  onCancel?: (starsCount: number) => void;
  onAccept?: (starsCount: number, feedback?: string) => void;
  rate?: number;
}

export const RatingCard = (props: RatingCardProps) => {
  const { className, onAccept, rate, onCancel, hasFeedback, feedbackTitle, title } = props;
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [starsCount, setStarsCount] = useState(rate ?? 0);
  const [feedback, setFeedback] = useState('');
  const onSelectStars = useCallback(
    (selectedStarsCount: number) => {
      setStarsCount(selectedStarsCount);
      if (hasFeedback) {
        setIsOpen(true);
      } else {
        onAccept?.(selectedStarsCount);
      }
    },
    [hasFeedback, onAccept]
  );

  const acceptHandle = () => {
    setIsOpen(false);
    onAccept?.(starsCount, feedback);
  };

  const cancelHandler = () => {
    setIsOpen(false);
    console.log(isOpen);
    onCancel?.(starsCount);
  };
  const modal = (
    <>
      <Text title={feedbackTitle} />
      <Input data-testid={'RatingCard.Input'} value={feedback} onChange={setFeedback} placeholder={'Ваш отзыв'} />
    </>
  );
  return (
    <Card data-testid={'RatingCard'} max className={classNames('', {}, [className])}>
      <VStack align={'center'} gap={'8'} max>
        <Text title={starsCount ? t('Спасибо за оценку') : title} />
        <StarRating size={40} selectedStars={starsCount} onSelect={onSelectStars} />
      </VStack>
      {isMobile() ? (
        <Drawer isOpen={isOpen} onClose={cancelHandler}>
          <VStack max gap={'32'}>
            {modal}
            <Button onClick={acceptHandle}>{t('Отправить')}</Button>
          </VStack>
        </Drawer>
      ) : (
        isOpen && (
          <Modal open={isOpen}>
            <VStack max gap={'32'}>
              {modal}
              <HStack max gap={'16'} justify={'end'}>
                <Button data-testid={'RatingCard.Close'} onClick={cancelHandler} theme={ButtonTheme.OUTLINE_RED}>
                  {t('Закрыть')}
                </Button>
                <Button data-testid={'RatingCard.Send'} onClick={acceptHandle}>
                  {t('Отправить')}
                </Button>
              </HStack>
            </VStack>
          </Modal>
        )
      )}
    </Card>
  );
};
