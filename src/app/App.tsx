import React, { Suspense, useState } from 'react'
import { useTheme } from './providers/ThemeProvider/lib/useTheme'
import { classNames } from 'shared/lib/classNames/classNames'
import { AppRouter } from 'app/providers/router'
import { Navbar } from 'widgets/Navbar'
import { Sidebar } from 'widgets/Sidebar'

const App = () => {
  // const { theme } = useTheme()
  return (
		<div className={classNames('app', {}, [])}>
			<Suspense fallback=''>
				<Navbar/>
				<div className='content-page'>
					<Sidebar/>
					<AppRouter/>
				</div>
			</Suspense>
		</div>
  )
}

export default App
