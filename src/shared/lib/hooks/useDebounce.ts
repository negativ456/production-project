import { useCallback, useRef } from 'react';
import { TimeoutId } from '@reduxjs/toolkit/dist/query/core/buildMiddleware/types';

export function useDebounce<T>(func: (...args: T[]) => void, delay: number) {
  const timer = useRef<TimeoutId>();

  return useCallback(
    (...args: T[]) => {
      if (timer.current) {
        clearInterval(timer.current);
      }
      timer.current = setTimeout(() => {
        func(...args);
      }, delay);
    },
    [delay, func]
  );
}
