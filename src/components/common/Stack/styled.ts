import styled from 'styled-components';

interface SStackProps {
  direction: 'vertical' | 'horizontal';
  spacing: number;
}

const SStack = styled.div<SStackProps>`
  display: flex;
  flex-direction: ${(props) => (props.direction === 'vertical' ? 'column' : 'row')};
  gap: ${(props) => props.spacing || 0}px;
`;

export default SStack;
