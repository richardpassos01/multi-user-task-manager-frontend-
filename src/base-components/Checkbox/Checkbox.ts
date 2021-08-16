import { theme } from '@styles';
import styled from 'styled-components';

interface CheckboxProps {
  readonly checked: boolean;
}

const Checkbox = styled.div<CheckboxProps>`
  min-width: 24px;
  min-height: 24px;
  border: 1px solid ${theme.primary.green};
  border-radius: 4px;

  ${props =>
    props.checked &&
    `
    background: ${theme.primary.green};
  `};
`;

export default Checkbox;
