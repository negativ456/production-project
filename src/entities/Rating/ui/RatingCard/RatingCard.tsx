import { classNames } from '@/shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { Card as CardDeprecated } from '@/shared/ui/deprecated/Card/Card';
import { Card } from '@/shared/ui/redesigned/Card/Card';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { Text as TextDeprecated } from '@/shared/ui/deprecated/Text/Text';
import { Text } from '@/shared/ui/redesigned/Text/Text';
import { StarRating as StarRatingDeprecated } from '@/shared/ui/deprecated/StarRating/StarRating';
import { Modal } from '@/shared/ui/redesigned/Modal/Modal';
import { Input as InputDeprecated } from '@/shared/ui/deprecated/Input/Input';
import { Input } from '@/shared/ui/redesigned/Input/Input';
import { useCallback, useState } from 'react';
import { Button as ButtonDeprecated, ButtonTheme } from '@/shared/ui/deprecated/Button/Button';
import { Button } from '@/shared/ui/redesigned/Button/Button';
import { isMobile } from '@/shared/lib/detectDevice/detectDevice';
import { Drawer } from '@/shared/ui/deprecated/Drawer/Drawer';
import { ToggleFeatures } from '@/shared/lib/features';

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
    <ToggleFeatures
      feature={'isAppRedesigned'}
      on={
        <>
          <Text title={feedbackTitle} />
          <Input data-testid={'RatingCard.Input'} value={feedback} onChange={setFeedback} placeholder={'Ваш отзыв'} />
        </>
      }
      off={
        <>
          <TextDeprecated title={feedbackTitle} />
          <InputDeprecated
            data-testid={'RatingCard.Input'}
            value={feedback}
            onChange={setFeedback}
            placeholder={'Ваш отзыв'}
          />
        </>
      }
    />
  );

  const content = (
    <>
      <VStack align={'center'} gap={'8'} max>
        <ToggleFeatures
          feature={'isAppRedesigned'}
          on={<Text title={starsCount ? t('Спасибо за оценку') : title} />}
          off={<TextDeprecated title={starsCount ? t('Спасибо за оценку') : title} />}
        />

        <StarRatingDeprecated size={40} selectedStars={starsCount} onSelect={onSelectStars} />
      </VStack>
      {isMobile() ? (
        <Drawer isOpen={isOpen} onClose={cancelHandler}>
          <VStack max gap={'32'}>
            {modal}
            <ToggleFeatures
              feature={'isAppRedesigned'}
              on={<Button onClick={acceptHandle}>{t('Отправить')}</Button>}
              off={<ButtonDeprecated onClick={acceptHandle}>{t('Отправить')}</ButtonDeprecated>}
            />
          </VStack>
        </Drawer>
      ) : (
        isOpen && (
          <Modal open={isOpen}>
            <VStack max gap={'32'}>
              {modal}
              <ToggleFeatures
                feature={'isAppRedesigned'}
                on={
                  <HStack max gap={'16'} justify={'end'}>
                    <Button data-testid={'RatingCard.Close'} onClick={cancelHandler}>
                      {t('Закрыть')}
                    </Button>
                    <Button data-testid={'RatingCard.Send'} onClick={acceptHandle}>
                      {t('Отправить')}
                    </Button>
                  </HStack>
                }
                off={
                  <HStack max gap={'16'} justify={'end'}>
                    <ButtonDeprecated
                      data-testid={'RatingCard.Close'}
                      onClick={cancelHandler}
                      theme={ButtonTheme.OUTLINE_RED}>
                      {t('Закрыть')}
                    </ButtonDeprecated>
                    <ButtonDeprecated data-testid={'RatingCard.Send'} onClick={acceptHandle}>
                      {t('Отправить')}
                    </ButtonDeprecated>
                  </HStack>
                }
              />
            </VStack>
          </Modal>
        )
      )}
    </>
  );
  return (
    <ToggleFeatures
      feature={'isAppRedesigned'}
      on={
        <Card
          padding={'24'}
          borderRadius={'40'}
          data-testid={'RatingCard'}
          max
          className={classNames('', {}, [className])}>
          {content}
        </Card>
      }
      off={
        <CardDeprecated data-testid={'RatingCard'} max className={classNames('', {}, [className])}>
          {content}
        </CardDeprecated>
      }
    />
  );
};
