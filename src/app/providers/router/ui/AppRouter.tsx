import React, { useCallback } from 'react'
import { Route, Routes } from 'react-router-dom'
import { AppRoutesProps, routeConfig } from '@/shared/config/routerConfig/routeConfig'
import { PageLoader } from '@/widgets/PageLoader/ui/PageLoader'
import { RequireAuth } from '@/app/providers/router/ui/RequireAuth'

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
