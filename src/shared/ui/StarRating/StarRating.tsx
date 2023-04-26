import { classNames } from '@/shared/lib/classNames/classNames'
import StarIcon from '@/shared/assets/icons/star.svg'
import cls from './StarRating.module.scss'
import { Icon } from '@/shared/ui/Icon/Icon'
import { useState } from 'react'

interface StarRatingProps {
  className?: string
  onSelect?: (starsCount: number) => void
  size?: number
  selectedStars?: number
}
const stars = [1, 2, 3, 4, 5]
export const StarRating = ({ className, onSelect, selectedStars, size }: StarRatingProps) => {
  const [currentStarsCount, setCurrentStarsCount] = useState(0)
  const [isSelected, setIsSelected] = useState(false)

  const onHover = (starsCount: number) => () => {
    if (!isSelected) {
      setCurrentStarsCount(starsCount)
    }
  }
  const onLeave = () => {
    if (!isSelected) {
      setCurrentStarsCount(0)
    }
  }

  const onClick = (starsCount: number) => () => {
    if (!isSelected) {
      onSelect?.(starsCount)
      setCurrentStarsCount(starsCount)
      setIsSelected(true)
    }
  }
  return (
      <div className={classNames(cls.StarRating, {}, [className])}>
        {stars.map(starNumber =>
            <Icon
                className={classNames(cls.star, { [cls.hovered]: currentStarsCount >= starNumber, [cls.selected]: isSelected }, [])}
                width={size}
                height={size}
                key={starNumber}
                Svg={StarIcon}
                onMouseEnter={onHover(starNumber)}
                onMouseLeave={onLeave}
                onClick={onClick(starNumber)}
            />)}
      </div>
  )
}
