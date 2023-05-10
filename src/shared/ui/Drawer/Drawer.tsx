import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Drawer.module.scss';
import { ReactNode, useEffect } from 'react';
import { useTheme } from '@/shared/lib/hooks/useTheme';
import { Portal } from '../Portal/Portal';
import { Overlay } from '../Overlay/Overlay';
import { AnimationProvider, useAnimationLibs } from '@/shared/lib/AnimationProvider';

interface DrawerProps {
  className?: string;
  children?: ReactNode;
  isOpen?: boolean;
  onClose?: () => void;
}
const height = window.innerHeight - 100;
const DrawerContent = ({ className, children, onClose, isOpen }: DrawerProps) => {
  const { theme } = useTheme();
  const { Spring, Gesture } = useAnimationLibs();
  const [{ y }, api] = Spring.useSpring(() => ({ y: height }));
  const openDrawer = () => {
    api.start({ y: 0, immediate: false });
  };

  useEffect(() => {
    if (isOpen) {
      openDrawer();
    }
  }, [isOpen, openDrawer]);

  const close = (velocity = 0) => {
    api.start({
      y: height,
      immediate: false,
      config: { ...Spring.config.stiff, velocity },
      onResolve: onClose,
    });
  };

  const bind = Gesture.useDrag(
    ({ last, velocity: [, vy], direction: [, dy], movement: [, my], cancel }) => {
      if (my < -70) cancel();

      if (last) {
        if (my > height * 0.5 || (vy > 0.5 && dy > 0)) {
          close();
        } else {
          openDrawer();
        }
      } else {
        api.start({ y: my, immediate: true });
      }
    },
    {
      from: () => [0, y.get()],
      filterTaps: true,
      bounds: { top: 0 },
      rubberband: true,
    }
  );

  if (!isOpen) {
    return null;
  }

  const display = y.to((py) => (py < height ? 'block' : 'none'));
  return (
    <Portal>
      <div className={classNames(cls.Drawer, { [cls.opened]: isOpen }, [className, theme, 'app_drawer'])}>
        <Overlay onClick={onClose} />
        <Spring.a.div
          className={cls.sheet}
          style={{ display, bottom: `calc(-100vh + ${height - 100}px)`, y }}
          {...bind()}>
          {children}
        </Spring.a.div>
      </div>
    </Portal>
  );
};

export const AsyncDrawer = (props: DrawerProps) => {
  const { isLoaded } = useAnimationLibs();

  if (!isLoaded) {
    return null;
  }

  return <DrawerContent {...props} />;
};

export const Drawer = (props: DrawerProps) => {
  return (
    <AnimationProvider>
      <AsyncDrawer {...props} />
    </AnimationProvider>
  );
};
