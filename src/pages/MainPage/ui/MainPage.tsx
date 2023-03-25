import React from 'react'
import { useTranslation } from 'react-i18next'
import { BugButton } from 'app/providers/ErrorBoundary'
import { Page } from 'shared/ui/Page/Page'

const MainPage = () => {
  const { t } = useTranslation()
  return (
		<Page>
      <BugButton/>
			{t('Главная')}
		</Page>
  )
}

export default MainPage
