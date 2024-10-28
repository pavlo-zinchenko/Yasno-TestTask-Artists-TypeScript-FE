import SCard from './styled';
import { ReactNode } from 'react';
import { DivProps } from 'src/interfaces/props/DivProps';
import { SxProps } from '@mui/system';

interface CustomCardProps extends DivProps {
  children: ReactNode;
  sx?: SxProps;
}

export default function CustomCard({ children, sx, ...props }: CustomCardProps) {
  return <SCard {...props} sx={sx}>{children}</SCard>;
}
