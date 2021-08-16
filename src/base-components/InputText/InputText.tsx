import * as React from "react";
import { Box } from "reflexbox";
import { Container, SpanError, Input } from "./InputText.styles";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  invalid?: any;
  value?: any;
}

const InputText = React.forwardRef<any, Props>(({ invalid, ...props }) => (
  <Container>
    <Input {...props} invalid={invalid} />
    {invalid && (
      <Box mt={1}>
        <SpanError>{invalid}</SpanError>
      </Box>
    )}
  </Container>
));

export default InputText;
