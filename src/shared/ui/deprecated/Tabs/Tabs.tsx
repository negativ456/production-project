import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Tabs.module.scss';
import { ReactNode } from 'react';
import { Card, CardTheme } from '../Card/Card';

export interface TabItem<T extends string> {
  value: T;
  content: ReactNode;
}
interface TabsProps<T extends string> {
  className?: string;
  tabs: Array<TabItem<T>>;
  value: string;
  onTabClick: (tab: TabItem<T>) => void;
}
/**
 * Deprecated, you should use new components from redesigned folder
 * @deprecated
 */
export const Tabs = <T extends string>({ className, tabs, onTabClick, value }: TabsProps<T>) => {
  const clickHandle = (tab: TabItem<T>) => {
    return () => {
      onTabClick(tab);
    };
  };
  return (
    <div className={classNames(cls.Tabs, {}, [className])}>
      {tabs.map((tab) => (
        <Card
          theme={tab.value === value ? CardTheme.NORMAL : CardTheme.OUTLINED}
          key={tab.value}
          onClick={clickHandle(tab)}
          className={cls.tab}>
          {tab.content}
        </Card>
      ))}
    </div>
  );
};
