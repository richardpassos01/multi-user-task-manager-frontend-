import { Span } from "./Title.styles";

interface Props {
  title: string;
  color?: string;
}

const Title: React.FunctionComponent<Props> = ({ title, color }) => {
  return (
    <>
      <Span color={color}>{title}</Span>
    </>
  );
};

export default Title;
