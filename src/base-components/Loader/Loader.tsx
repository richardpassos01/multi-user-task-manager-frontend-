import * as React from "react";
import styled from "styled-components";
import { theme } from "../../styles";
import { Box } from "reflexbox";

const Loading = styled.div`
  width: 80px;
  height: 80px;
  background: transparent;
  border-radius: 50%;
  border: 2px solid ${theme.primary.grey};
  border-bottom-color: transparent;
  animation: screen-loading 700ms linear infinite;

  @keyframes screen-loading {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

const Loader: React.FunctionComponent = () => (
  <Box width={40} height={40}>
    <Loading />
  </Box>
);

export default Loader;
