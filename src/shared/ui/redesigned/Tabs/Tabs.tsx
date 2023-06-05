import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Tabs.module.scss';
import { ReactNode } from 'react';
import { Card } from '../Card/Card';
import { Flex, FlexDirection } from '../Stack/Flex/Flex';

export interface TabItem<T extends string> {
  value: T;
  content: ReactNode;
}
interface TabsProps<T extends string> {
  className?: string;
  tabs: Array<TabItem<T>>;
  value: string;
  onTabClick: (tab: TabItem<T>) => void;
  direction: FlexDirection;
}

export const Tabs = <T extends string>({ className, tabs, onTabClick, value, direction = 'row' }: TabsProps<T>) => {
  const clickHandle = (tab: TabItem<T>) => {
    return () => {
      onTabClick(tab);
    };
  };
  return (
    <Flex align={'start'} gap={'8'} direction={direction} className={classNames('', {}, [className])}>
      {tabs.map((tab) => (
        <Card
          variant={tab.value === value ? 'outlined' : 'normal'}
          key={tab.value}
          onClick={clickHandle(tab)}
          className={cls.tab}
          borderRadius={'40'}>
          {tab.content}
        </Card>
      ))}
    </Flex>
  );
};
