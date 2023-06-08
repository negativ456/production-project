import { useTranslation } from 'react-i18next';
import { ListBox } from '@/shared/ui/redesigned/Popups';
import { getFeatureFlags } from '@/shared/lib/features';
import { getAllFeatureFlags } from '@/shared/lib/features/lib/setGetFeatures';
import { useSelector } from 'react-redux';
import { getUserAuthData } from '@/entities/User';
import { useUpdateFeatureFlags } from '@/shared/lib/features/api/featureFlagsApi';

interface UiDesignSwitcherProps {
  className?: string;
}

export const UiDesignSwitcher = ({ className }: UiDesignSwitcherProps) => {
  const { t } = useTranslation();
  const [updateFlagsMutation] = useUpdateFeatureFlags();

  const items = [
    {
      content: t('Новый'),
      value: 'new',
    },
    {
      content: t('Старый'),
      value: 'old',
    },
  ];
  const isAppRedesigned = getFeatureFlags('isAppRedesigned');
  const allFeatures = getAllFeatureFlags();
  const userData = useSelector(getUserAuthData);

  const onChange = (value: string) => {
    if (userData) {
      try {
        updateFlagsMutation({
          features: {
            ...allFeatures,
            isAppRedesigned: value === 'new',
          },
          userId: userData?.id,
        });
        window.location.reload();
      } catch (e) {
        console.log(e);
      }
    }
  };
  return (
    <ListBox
      label={t('Вариант интерфейса')}
      onChange={onChange}
      items={items}
      value={isAppRedesigned ? 'new' : 'old'}
    />
  );
};
