import cls from './AppLoaderLayout.module.scss';
import { MainLayout } from '../MainLayout';
import { HStack, VStack } from '../../redesigned/Stack';
import { Skeleton } from '../../redesigned/Skeleton/Skeleton';

export const AppLoaderLayout = () => {
  return (
    <MainLayout
      header={
        <HStack className={cls.header}>
          <Skeleton width={40} height={40} border={'100%'} />
        </HStack>
      }
      content={
        <VStack gap={'16'} style={{ height: '100%' }}>
          <Skeleton width={'100%'} height={32} border={'16px'} />
          <Skeleton width={'100%'} height={32} border={'16px'} />
          <Skeleton width={'100%'} height={32} border={'16px'} />
          <Skeleton width={'100%'} height={32} border={'16px'} />
          <Skeleton width={'100%'} height={32} border={'16px'} />
          <Skeleton width={'100%'} height={32} border={'16px'} />
        </VStack>
      }
      sidebar={<Skeleton border={'32px'} width={220} height={'100%'} />}
    />
  );
};
