import { classNames } from 'shared/lib/classNames/classNames'
import cls from './Page.module.scss'
import { MutableRefObject, ReactNode, useRef } from 'react'
import { useInfiniteScroll } from 'shared/lib/hooks/useInfiniteScroll'

interface PageProps {
  className?: string
  children: ReactNode
  onScrollCallback?: () => void
}

export const Page = ({ className, children, onScrollCallback }: PageProps) => {
  const wrapperRef = useRef() as MutableRefObject<HTMLDivElement>
  const triggerRef = useRef() as MutableRefObject<HTMLDivElement>
  useInfiniteScroll({
    triggerRef,
    wrapperRef,
    callback: onScrollCallback
  })
  return (
      <section ref={wrapperRef} className={classNames(cls.Page, {}, [className])}>
        {children}
        <div ref={triggerRef}/>
      </section>
  )
}
