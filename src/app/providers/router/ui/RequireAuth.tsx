import { useSelector } from 'react-redux'
import { getUserAuthData } from 'entities/User/model/selectors/getUserAuthData/getUserAuthData'
import { Navigate, useLocation } from 'react-router-dom'
import { RoutePath } from 'shared/config/routerConfig/routeConfig'
import { ReactNode, useMemo } from 'react'
import { getUserRoles } from 'entities/User'
import { UserRole } from 'entities/User/model/const/userConsts'

interface RequireAuthProps {
  children: ReactNode
  roles?: UserRole[]
}

export const RequireAuth = ({ children, roles }: RequireAuthProps) => {
  const auth = useSelector(getUserAuthData)
  const userRoles = useSelector(getUserRoles)
  const hasRequireRoles = useMemo(() => {
    if (!roles) {
      return true
    }
    return roles.some(role => {
      const hasRole = userRoles?.includes(role)
      return hasRole
    })
  }, [roles, userRoles])
  const location = useLocation()

  if (!auth) {
    return <Navigate to={RoutePath.main} state={{ from: location }} replace/>
  }
  if (!hasRequireRoles) {
    return <Navigate to={RoutePath.forbidden} state={{ from: location }} replace/>
  }
  return <>
    {children}
  </>
}
