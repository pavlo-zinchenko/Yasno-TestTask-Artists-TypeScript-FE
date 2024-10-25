import SStack from './styled';
import { ReactNode } from 'react';
import { DivProps } from 'src/interfaces/props/DivProps';

interface StackProps extends DivProps {
  direction?: 'vertical' | 'horizontal';
  spacing?: number;
  children: ReactNode;
}

export default function Stack({
  direction = 'vertical',
  spacing = 0,
  children,
  ...props
}: StackProps) {
  return (
    <SStack direction={direction} spacing={spacing} {...props}>
      {children}
    </SStack>
  );
}
