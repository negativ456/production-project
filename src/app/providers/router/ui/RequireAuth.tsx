import { useSelector } from 'react-redux';
import { getUserAuthData, getUserRoles, UserRole } from '@/entities/User';
import { Navigate, useLocation } from 'react-router-dom';
import { ReactNode, useMemo } from 'react';

import { AppRoutes, routes } from '@/shared/const/router';

interface RequireAuthProps {
  children: ReactNode;
  roles?: UserRole[];
}

export const RequireAuth = ({ children, roles }: RequireAuthProps) => {
  const auth = useSelector(getUserAuthData);
  const userRoles = useSelector(getUserRoles);
  const hasRequireRoles = useMemo(() => {
    if (!roles) {
      return true;
    }
    return roles.some((role) => {
      const hasRole = userRoles?.includes(role);
      return hasRole;
    });
  }, [roles, userRoles]);
  const location = useLocation();

  if (!auth) {
    return <Navigate to={routes[AppRoutes.MAIN]()} state={{ from: location }} replace />;
  }
  if (!hasRequireRoles) {
    return <Navigate to={routes[AppRoutes.FORBIDDEN]()} state={{ from: location }} replace />;
  }
  return <>{children}</>;
};
