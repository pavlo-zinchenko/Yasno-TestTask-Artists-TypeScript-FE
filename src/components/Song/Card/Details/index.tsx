import SDetails from './styled';
import { ChildrenProps } from '@interfaces';

export default function Details({ children }: ChildrenProps) {
  return (
    <SDetails
      sx={{
        flexGrow: 1,
        justifyContent: 'space-between',
        ml: 2,
      }}
    >
      {children}
    </SDetails>
  );
}
