import { ComponentPropsWithoutRef, ElementType, PropsWithChildren } from 'react';

export type DropdownDirection = 'top left' | 'top right' | 'bottom left' | 'bottom right';

export interface AsProp<E extends ElementType> {
  as?: E;
}

export type PropsToOmit<E extends ElementType, P> = keyof (AsProp<E> & P);

export type PolymorphicComponentProp<E extends ElementType, Props = Record<any, any>> = PropsWithChildren<
  Props & AsProp<E>
> &
  Omit<ComponentPropsWithoutRef<E>, PropsToOmit<E, Props>>;
