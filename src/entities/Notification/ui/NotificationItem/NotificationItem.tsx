import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './NotificationItem.module.scss';
import { Notification } from '../../model/types/notification';
import { Card as CardDeprecated, CardTheme } from '@/shared/ui/deprecated/Card/Card';
import { Text as TextDeprecated } from '@/shared/ui/deprecated/Text/Text';
import { Text } from '@/shared/ui/redesigned/Text/Text';
import { ToggleFeatures } from '@/shared/lib/features';
import { Card } from '@/shared/ui/redesigned/Card/Card';

interface NotificationItemProps {
  className?: string;
  item: Notification;
}

export const NotificationItem = ({ className, item }: NotificationItemProps) => {
  const content = (
    <ToggleFeatures
      feature={'isAppRedesigned'}
      on={
        <Card variant={'outlined'} className={classNames(cls.NotificationItem, {}, [className])}>
          <Text title={item.title} text={item.description} />
        </Card>
      }
      off={
        <CardDeprecated theme={CardTheme.OUTLINED} className={classNames(cls.NotificationItem, {}, [className])}>
          <TextDeprecated title={item.title} text={item.description} />
        </CardDeprecated>
      }
    />
  );
  if (item.href) {
    return (
      <a className={cls.link} target={'_blank'}>
        {content}
      </a>
    );
  }
  return <>{content}</>;
};
