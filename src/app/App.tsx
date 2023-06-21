import React, { Suspense, useEffect } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { AppRouter } from './providers/router/ui/AppRouter';
import { Navbar } from '@/widgets/Navbar';
import { Sidebar } from '@/widgets/Sidebar';
import { useSelector } from 'react-redux';
import { getUserMounted, initAuthData } from '@/entities/User';

import { useTheme } from '@/shared/lib/hooks/useTheme';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { PageLoader } from '@/widgets/PageLoader';
import { ToggleFeatures } from '@/shared/lib/features';
import { MainLayout } from '@/shared/ui/layouts/MainLayout';
import { AppLoaderLayout } from '@/shared/ui/layouts/AppLoaderLayout/AppLoaderLayout';
import { useAppToolbar } from './lib/useAppToolbar';
import { WithTheme } from './providers/ThemeProvider/ui/withTheme';

const App = () => {
  const dispatch = useAppDispatch();
  const mounted = useSelector(getUserMounted);
  const { theme } = useTheme();
  const toolbar = useAppToolbar();
  useEffect(() => {
    dispatch(initAuthData());
    document.body.className = theme as string;
  }, [dispatch, theme]);

  if (!mounted) {
    return (
      <ToggleFeatures
        feature={'isAppRedesigned'}
        on={
          <div className={classNames('app_redesigned', {}, [])}>
            <AppLoaderLayout />
          </div>
        }
        off={<PageLoader />}
      />
    );
  }

  return (
    <ToggleFeatures
      feature={'isAppRedesigned'}
      off={
        <div className={classNames('app', {}, [])}>
          <Suspense fallback="">
            <Navbar />
            <div className="content-page">
              <Sidebar />
              <AppRouter />
            </div>
          </Suspense>
        </div>
      }
      on={
        <div className={classNames('app_redesigned', {}, [])}>
          <Suspense fallback="">
            <MainLayout header={<Navbar />} sidebar={<Sidebar />} content={<AppRouter />} toolbar={toolbar} />
          </Suspense>
        </div>
      }
    />
  );
};

export default WithTheme(App);
