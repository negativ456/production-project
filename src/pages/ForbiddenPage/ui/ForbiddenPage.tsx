import { classNames } from '@/shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { Page } from '@/widgets/Page';

interface ForbiddenPageProps {
  className?: string;
}

const ForbiddenPage = ({ className }: ForbiddenPageProps) => {
  const { t } = useTranslation();
  return (
    <Page data-testid={'ForbiddenPage'} className={classNames('', {}, [className])}>
      {t('Доступ запрещен')}
    </Page>
  );
};
export default ForbiddenPage;
