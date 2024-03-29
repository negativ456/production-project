import { MutableRefObject, useRef } from 'react';
import { useInitialEffect } from './useInitialEffect';
import { toggleFeatures } from '../features/lib/toggleFeatures';

export interface UseInfiniteScrollOptions {
  callback?: () => void;
  triggerRef: MutableRefObject<HTMLElement>;
  wrapperRef?: MutableRefObject<HTMLElement>;
}

export function useInfiniteScroll({ callback, wrapperRef, triggerRef }: UseInfiniteScrollOptions) {
  const observer = useRef<IntersectionObserver | null>(null);

  useInitialEffect(() => {
    const wrapperElement = wrapperRef?.current;
    const triggerElement = triggerRef.current;

    if (callback) {
      const options = {
        root: toggleFeatures({
          name: 'isAppRedesigned',
          on: () => null,
          off: () => wrapperElement,
        }),
        rootMargin: '0px',
        threshold: 1.0,
      };

      observer.current = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          callback();
        }
      }, options);

      observer.current.observe(triggerElement);
    }

    return () => {
      if (observer.current && triggerElement) {
        observer.current.unobserve(triggerElement);
      }
    };
  });
}
