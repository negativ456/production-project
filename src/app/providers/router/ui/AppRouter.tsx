import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { routeConfig } from 'shared/config/routerConfig/routeConfig'
import { PageLoader } from 'widgets/PageLoader/ui/PageLoader'

export const AppRouter = () => (
	<React.Suspense fallback={<PageLoader/>}>
		<div className='page-wrapper'>
			<Routes>
				{routeConfig.map(({ path, element }) => <Route key={path} path={path} element={element}/>)}
			</Routes>
		</div>
	</React.Suspense>
)
