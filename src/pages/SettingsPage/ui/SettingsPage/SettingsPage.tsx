import { useTranslation } from 'react-i18next';
import { Page } from '@/widgets/Page';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { Text } from '@/shared/ui/redesigned/Text/Text';
import { UiDesignSwitcher } from '@/features/UiDesignSwitcher';

interface SettingsPageProps {
  className?: string;
}

const SettingsPage = ({ className }: SettingsPageProps) => {
  const { t } = useTranslation();
  return (
    <Page>
      <VStack>
        <Text title={t('Настройки пользователя')} />
        <UiDesignSwitcher />
      </VStack>
    </Page>
  );
};

export default SettingsPage;
