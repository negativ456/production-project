import { DropdownDirection } from '@/shared/types/ui';
import cls from './popup.module.scss';

export const mapDirectionClass: Record<DropdownDirection, string> = {
  'bottom left': cls.bottom_left,
  'bottom right': cls.bottom_right,
  'top left': cls.top_left,
  'top right': cls.top_right,
};
