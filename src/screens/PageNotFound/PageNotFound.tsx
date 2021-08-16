import Header from "@components/Header";
import React from "react";
import { Wrapper, Content } from "./PageNotFound.styles";

const PageNotFound: React.FC = () => (
  <>
    <Header />
    <Wrapper>
      <Content>Page Not Found</Content>
    </Wrapper>
  </>
);

export default PageNotFound;
