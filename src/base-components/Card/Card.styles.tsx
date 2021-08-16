import { theme } from '@styles';
import { Box } from 'reflexbox';
import styled from 'styled-components';

const  Card = styled(Box)`
  background-color: ${theme.primary.white};
  margin: auto;
  border-radius: 10px;
  padding: 0;
  box-shadow: 0 4px 8px 0 ${theme.primary.grey}, 0 6px 20px 0 ${theme.primary.grey};
`;

export default Card;
