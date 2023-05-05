import React, { useCallback } from 'react'
import { Route, Routes } from 'react-router-dom'
import { PageLoader } from '@/widgets/PageLoader'
import { RequireAuth } from './RequireAuth'
import { routeConfig } from '../config/routeConfig'
import { AppRoutesProps } from '@/shared/types/router'

export const AppRouter = () => {
  const renderWithWrapper = useCallback((route: AppRoutesProps) => {
    return <Route
				key={route.path}
				path={route.path}
				element={route.authOnly ? <RequireAuth>{route.element}</RequireAuth> : route.element}/>
  }, [])
  return <React.Suspense fallback={<PageLoader/>}>
		<Routes>
			{routeConfig.map(renderWithWrapper)}
		</Routes>
	</React.Suspense>
}
