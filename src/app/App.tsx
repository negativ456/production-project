import React, { Suspense, useEffect } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import { AppRouter } from 'app/providers/router'
import { Navbar } from 'widgets/Navbar'
import { Sidebar } from 'widgets/Sidebar'
import { useDispatch, useSelector } from 'react-redux'
import { userActions } from 'entities/User'
import { getUserMounted } from 'entities/User/model/selectors/getUserMounted/getUserMounted'

const App = () => {
  const dispatch = useDispatch()
  const mounted = useSelector(getUserMounted)
  useEffect(() => {
    dispatch(userActions.initUserData())
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
