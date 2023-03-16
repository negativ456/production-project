import { useSelector } from 'react-redux'
import { getUserAuthData } from 'entities/User/model/selectors/getUserAuthData/getUserAuthData'
import { Navigate, useLocation } from 'react-router-dom'
import { RoutePath } from 'shared/config/routerConfig/routeConfig'
import React from 'react'

export const RequireAuth: React.FC = ({ children }) => {
  const auth = useSelector(getUserAuthData)
  const location = useLocation()
  if (!auth) {
    return <Navigate to={RoutePath.main} state={{ from: location }} replace/>
  }
  return <>
    {children}
  </>
}
