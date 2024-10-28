import SContainer from './styled';
import { ChildrenProps } from '@interfaces';

export default function Container({ children }: ChildrenProps) {
  return (
    <SContainer>
      {children}
    </SContainer>
  );
}
