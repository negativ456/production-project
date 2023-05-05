import React, { Suspense, useEffect } from 'react'
import { classNames } from '@/shared/lib/classNames/classNames'
import { AppRouter } from './providers/router/ui/AppRouter'
import { Navbar } from '@/widgets/Navbar'
import { Sidebar } from '@/widgets/Sidebar'
import { useDispatch, useSelector } from 'react-redux'
import { userActions, getUserMounted } from '@/entities/User'

import { useTheme } from '@/shared/lib/hooks/useTheme'

const App = () => {
  const dispatch = useDispatch()
  const mounted = useSelector(getUserMounted)
  const { theme } = useTheme()
  useEffect(() => {
    dispatch(userActions.initUserData())
    document.body.className = theme as string
  }, [dispatch])
  return (
		<div className={classNames('app', {}, [])}>
			<Suspense fallback=''>
				<Navbar/>
				<div className='content-page'>
					<Sidebar/>
					{mounted && <AppRouter/>}
				</div>
			</Suspense>
		</div>
  )
}

export default App
