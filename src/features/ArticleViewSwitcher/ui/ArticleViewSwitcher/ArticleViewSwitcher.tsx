import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './ArticleViewSwitcher.module.scss';
import TileDeprecated from '@/shared/assets/icons/tile.svg';
import ListDeprecated from '@/shared/assets/icons/list.svg';
import List from '@/shared/assets/icons/article-list.svg';
import Tile from '@/shared/assets/icons/article-tile.svg';
import { Button as ButtonDeprecated, ButtonTheme } from '@/shared/ui/deprecated/Button/Button';
import { Icon as IconDeprecated } from '@/shared/ui/deprecated/Icon/Icon';
import { ArticleView } from '@/entities/Article';
import { toggleFeatures } from '@/shared/lib/features/lib/toggleFeatures';
import { ToggleFeatures } from '@/shared/lib/features';
import { Icon } from '@/shared/ui/redesigned/Icon/Icon';
import { Card } from '@/shared/ui/redesigned/Card/Card';
import { HStack } from '@/shared/ui/redesigned/Stack';

interface ArticleViewSwitcherProps {
  className?: string;
  view: ArticleView;
  onViewClick?: (view: ArticleView) => void;
}
const viewTypes = [
  {
    view: ArticleView.TILE,
    icon: toggleFeatures({
      name: 'isAppRedesigned',
      on: () => Tile,
      off: () => TileDeprecated,
    }),
  },
  {
    view: ArticleView.LIST,
    icon: toggleFeatures({
      name: 'isAppRedesigned',
      on: () => List,
      off: () => ListDeprecated,
    }),
  },
];
export const ArticleViewSwitcher = ({ className, view, onViewClick }: ArticleViewSwitcherProps) => {
  const onClick = (newView: ArticleView) => () => {
    if (onViewClick) {
      onViewClick(newView);
      console.log(newView);
    }
  };
  return (
    <ToggleFeatures
      feature={'isAppRedesigned'}
      on={
        <Card borderRadius={'40'} className={classNames(cls.ArticleViewSelectorRedesigned, {}, [className])}>
          <HStack gap={'8'}>
            {viewTypes.map((viewType) => (
              <Icon
                width={24}
                height={24}
                clickable
                key={viewType.view}
                onClick={onClick(viewType.view)}
                Svg={viewType.icon}
                className={classNames('', { [cls.not_selected]: viewType.view !== view }, [])}
              />
            ))}
          </HStack>
        </Card>
      }
      off={
        <div className={classNames(cls.ArticleViewSelector, {}, [className])}>
          {viewTypes.map((viewType) => (
            <ButtonDeprecated theme={ButtonTheme.CLEAR} key={viewType.view} onClick={onClick(viewType.view)}>
              <IconDeprecated
                width={24}
                height={24}
                Svg={viewType.icon}
                className={classNames('', { [cls.not_selected]: viewType.view !== view }, [])}
              />
            </ButtonDeprecated>
          ))}
        </div>
      }
    />
  );
};
