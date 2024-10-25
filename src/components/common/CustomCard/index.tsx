import SCard from './styled';
import { ReactNode } from 'react';
import { DivProps } from 'src/interfaces/props/DivProps';

interface CustomCardProps extends DivProps {
  children: ReactNode;
}

export default function CustomCard({ children, ...props }: CustomCardProps): JSX.Element {
  return <SCard {...props}>{children}</SCard>;
}
