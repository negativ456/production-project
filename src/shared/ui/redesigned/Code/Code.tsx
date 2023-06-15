import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Code.module.scss';
import { Text } from '../../deprecated/Text/Text';
import { Button, ButtonTheme } from '../../deprecated/Button/Button';
import CopyIcon from '@/shared/assets/icons/copy.svg';
import CopyIconNew from '@/shared/assets/icons/copy-new.svg';
import { useCallback } from 'react';
import { ToggleFeatures } from '@/shared/lib/features';
import { Icon } from '../Icon/Icon';

interface CodeProps {
  className?: string;
  text: string;
}

export const Code = ({ className, text }: CodeProps) => {
  const onCopy = useCallback(() => {
    navigator.clipboard.writeText(text);
  }, [text]);
  return (
    <ToggleFeatures
      feature={'isAppRedesigned'}
      on={
        <pre className={classNames(cls.CodeRedesigned, {}, [className])}>
          <Icon Svg={CopyIconNew} clickable className={cls.button} onClick={onCopy} />
          <code>{text}</code>
        </pre>
      }
      off={
        <pre className={classNames(cls.Code, {}, [className])}>
          <Button onClick={onCopy} theme={ButtonTheme.CLEAR} className={cls.button}>
            <CopyIcon className={cls.copy} />
          </Button>
          <code>
            <Text text={text} />
          </code>
        </pre>
      }
    />
  );
};
