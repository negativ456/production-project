import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './ArticleTextBlockComponent.module.scss';
import { ArticleTextBlock } from '../../model/types/article';
import { Text as TextDeprecated } from '@/shared/ui/deprecated/Text/Text';
import { Text } from '@/shared/ui/redesigned/Text/Text';
import { ToggleFeatures } from '@/shared/lib/features';

interface ArticleTextBlockComponentProps {
  className?: string;
  block: ArticleTextBlock;
}

export const ArticleTextBlockComponent = ({ className, block }: ArticleTextBlockComponentProps) => {
  return (
    <div className={classNames(cls.ArticleTextBlockComponent, {}, [className])}>
      {block.title && (
        <ToggleFeatures
          feature={'isAppRedesigned'}
          on={<Text title={block.title} className={cls.title} />}
          off={<TextDeprecated title={block.title} className={cls.title} />}
        />
      )}
      {block.paragraphs.map((paragraph) => (
        <ToggleFeatures
          feature={'isAppRedesigned'}
          key={paragraph}
          on={<Text text={paragraph} className={cls.paragraph} />}
          off={<TextDeprecated text={paragraph} className={cls.paragraph} />}
        />
      ))}
    </div>
  );
};
