import * as React from "react";
import { Flex, Box } from "reflexbox/styled-components";
import InputText from "@components/InputText";
import useReactRouter from "use-react-router";
import Header from "@components/Header";
import Card from "@components/Card";
import Title from "@components/Title";
import Button from "@components/Button";
import { UserRoutes } from "@domain/user/routes";
import Line from "@components/Line";
import { theme } from "@styles";
import { useFormik } from "formik2";
import { FormErrorMessages } from "@domain/shared/enums/FormErrorMessages";
import * as yup from "yup";
import useAuthentication from "@domain/user/hooks/useAuthentication";
import { ProjectManagerRoutes } from "@domain/project-manager/routes";
import Authentication from "@components/Authentication";

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .email(FormErrorMessages.EMAIL_FIELD)
    .required(FormErrorMessages.REQUIRED_FIELD),
  password: yup.string().required(FormErrorMessages.REQUIRED_FIELD),
});

const SignIn: React.FunctionComponent = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const { history } = useReactRouter();
  const { login } = useAuthentication();

  const redirectToSignUpPage = () => history.push(UserRoutes.SIGN_UP);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (data: any) => {
      try {
        setIsLoading(true);
        await login(data);
        history.push(ProjectManagerRoutes.DASHBOARD);
      } catch (error) {
        alert("unexpected error");
        setIsLoading(false);
      }
    },
  });

  return (
    <>
      <Authentication.Authenticated>
        <Header />
        <Flex justifyContent="center">
          <Card width={450}>
            <Flex mt={20} mb={20} alignItems="center" justifyContent="center">
              <Title title="Sign in" />
            </Flex>
            <Flex alignItems="center" justifyContent="center" mb={20} mt={30}>
              <Box width={[320, 400]}>
                <form onSubmit={formik.handleSubmit}>
                  <InputText
                    name="email"
                    onChange={formik.handleChange}
                    value={formik.values.email}
                    invalid={formik.touched.email && formik.errors.email}
                    placeholder="Email"
                  />
                  <InputText
                    name="password"
                    onChange={formik.handleChange}
                    value={formik.values.password}
                    invalid={formik.touched.password && formik.errors.password}
                    placeholder="Password"
                  />

                  <Flex
                    alignItems="center"
                    justifyContent="space-between"
                    mt={20}
                    flexDirection="column"
                  >
                    <Box width={300} height={50}>
                      <Button
                        disabled={isLoading}
                        color={theme.primary.blue}
                        type="submit"
                      >
                        Sign in
                      </Button>
                    </Box>
                  </Flex>
                </form>
                <Box mt={20}>
                  <Line />
                </Box>

                <Flex
                  alignItems="center"
                  justifyContent="space-between"
                  mt={20}
                  flexDirection="column"
                >
                  <Box width={200} height={40} mb={10}>
                    <Button onClick={redirectToSignUpPage} type="button">
                      Create new Account
                    </Button>
                  </Box>
                </Flex>
              </Box>
            </Flex>
          </Card>
        </Flex>
      </Authentication.Authenticated>
    </>
  );
};

export default SignIn;
