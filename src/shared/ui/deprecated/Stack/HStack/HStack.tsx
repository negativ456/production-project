import { Flex, FlexProps } from '../Flex/Flex';

type HStackProps = Omit<FlexProps, 'direction'>;
/**
 * Deprecated, you should use new components from redesigned folder
 * @deprecated
 */
export const HStack = (props: HStackProps) => {
  return <Flex direction="row" {...props} />;
};
