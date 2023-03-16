import { classNames } from 'shared/lib/classNames/classNames'
import cls from './ArticleTextBlockComponent.module.scss'
import { ArticleTextBlock } from 'entities/Article/model/types/article'
import { Text } from 'shared/ui/Text/Text'

interface ArticleTextBlockComponentProps {
  className?: string
  block: ArticleTextBlock
}

export const ArticleTextBlockComponent = ({ className, block }: ArticleTextBlockComponentProps) => {
  return (
      <div className={classNames(cls.ArticleTextBlockComponent, {}, [className])}>
        {block.title && <Text title={block.title} className={cls.title}/>}
        {block.paragraphs.map((paragraph) =>
            <Text key={paragraph} text={paragraph} className={cls.paragraph}/>
        )}
      </div>
  )
}
