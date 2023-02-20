import React from 'react'
import { useTranslation } from 'react-i18next'
import { BugButton } from 'app/providers/ErrorBoundary'
import { Counter } from 'entities/Counter'

const MainPage = () => {
  const { t } = useTranslation()
  return (
		<div>
      <BugButton/>
      <Counter/>
			{t('Главная')}
		</div>
  )
}

export default MainPage
