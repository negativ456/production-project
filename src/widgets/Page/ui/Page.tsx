import { classNames } from '@/shared/lib/classNames/classNames'
import cls from './Page.module.scss'
import { MutableRefObject, ReactNode, UIEvent, useRef } from 'react'
import { useInfiniteScroll } from '@/shared/lib/hooks/useInfiniteScroll'
import { useLocation } from 'react-router-dom'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch'
import { scrollActions } from '../model/slices/scrollSlice'
import { useSelector } from 'react-redux'
import { getScrollByPath } from '../model/selectors/scrollSelectors'
import { StateSchema } from '@/app/providers/StoreProvider'
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect'
import { useThrottle } from '@/shared/lib/hooks/useThrottle'
import { TestProps } from '@/shared/types/tests'

interface PageProps extends TestProps {
  className?: string
  children: ReactNode
  onScrollCallback?: () => void
}

export const Page = (props: PageProps) => {
  const { className, children, onScrollCallback } = props
  const wrapperRef = useRef() as MutableRefObject<HTMLDivElement>
  const triggerRef = useRef() as MutableRefObject<HTMLDivElement>
  const { pathname } = useLocation()
  const dispatch = useAppDispatch()
  const scrollPosition = useSelector((state: StateSchema) => getScrollByPath(state, pathname))
  useInfiniteScroll({
    triggerRef,
    wrapperRef,
    callback: onScrollCallback
  })
  useInitialEffect(() => {
    wrapperRef.current.scrollTop = scrollPosition
  })
  const onScroll = useThrottle<UIEvent<HTMLDivElement>>((e) => {
    console.log('scroll')
    dispatch(scrollActions.setScrollPosition({
      path: pathname,
      position: e.currentTarget.scrollTop
    }))
  }, 500)
  return (
      <section data-testid={props['data-testid'] ?? 'Page'} onScroll={onScroll} ref={wrapperRef} className={classNames(cls.Page, {}, [className])}>
        {children}
        {onScrollCallback && <div className={cls.trigger} ref={triggerRef}/>}
      </section>
  )
}
