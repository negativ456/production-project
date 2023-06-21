import React from 'react';
import { ThemeProvider } from './ThemeProvider';
import { useJsonSettings } from '@/entities/User';

export const WithTheme = (Component: React.ComponentType) => {
  return () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { theme: defaultTheme } = useJsonSettings();

    return (
      <ThemeProvider initialTheme={defaultTheme}>
        <Component />
      </ThemeProvider>
    );
  };
};
