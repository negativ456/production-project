import React from 'react'
import { useTranslation } from 'react-i18next'
import { Page } from '@/widgets/Page/ui/Page'
import { RatingCard } from '@/entities/Rating'

const MainPage = () => {
  const { t } = useTranslation()
  return (
		<Page>
			{t('Главная')}
      <RatingCard title={'Ваш отзыв'} feedbackTitle={'Оставьте отзыв о статье'} hasFeedback/>
		</Page>
  )
}

export default MainPage
