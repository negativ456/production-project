import { classNames } from 'shared/lib/classNames/classNames'
import cls from './ArticleViewSwitcher.module.scss'
import Tile from 'shared/assets/icons/tile.svg'
import List from 'shared/assets/icons/list.svg'
import { Button, ButtonTheme } from 'shared/ui/Button/Button'
import { Icon } from 'shared/ui/Icon/Icon'
import { ArticleView } from 'entities/Article'

interface ArticleViewSwitcherProps {
  className?: string
  view: ArticleView
  onViewClick?: (view: ArticleView) => void
}
const viewTypes = [
  {
    view: ArticleView.TILE,
    icon: Tile
  },
  {
    view: ArticleView.LIST,
    icon: List
  }
]
export const ArticleViewSwitcher = ({ className, view, onViewClick }: ArticleViewSwitcherProps) => {
  const onClick = (newView: ArticleView) => () => {
    if (onViewClick) {
      onViewClick(newView)
      console.log(newView)
    }
  }
  return (
      <div className={classNames(cls.ArticleViewSelector, {}, [className])}>
        {viewTypes.map(viewType => (
            <Button theme={ButtonTheme.CLEAR} key={viewType.view} onClick={onClick(viewType.view)}>
              <Icon Svg={viewType.icon} className={classNames('', { [cls.not_selected]: viewType.view !== view }, [])}/>
            </Button>
        ))}
      </div>
  )
}
