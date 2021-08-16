import { Box, Flex } from "reflexbox";
import { Content, HeaderIcon } from "./Header.styles";
import { Icons, theme } from "@styles";
import Title from "@components/Title";
import HyperLink from "@components/HyperLink";
import useAuthentication from "@domain/user/hooks/useAuthentication";

interface Props {
  enableLogout?: boolean;
}

const Header: React.FunctionComponent<Props> = ({ enableLogout }) => {
  const { logout } = useAuthentication();

  return (
    <>
      <Content>
        <Flex alignItems="center" justifyContent="center">
          <Box width={50}>
            <HeaderIcon src={Icons.Logo} />
          </Box>
          <Title color={theme.primary.blue} title="Manager your tasks" />
        </Flex>

        {enableLogout && (
          <HyperLink href="" onClick={logout}>
            Logout
          </HyperLink>
        )}
      </Content>
    </>
  );
};

export default Header;
