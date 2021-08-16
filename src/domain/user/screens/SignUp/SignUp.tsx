import * as React from "react";
import { Flex, Box } from "reflexbox/styled-components";
import InputText from "@components/InputText";
import Header from "@components/Header";
import Card from "@components/Card";
import Title from "@components/Title";
import Button from "@components/Button";
import HyperLink from "@components/HyperLink";
import { UserRoutes } from "@domain/user/routes";
import { useFormik } from "formik2";
import { FormErrorMessages } from "@domain/shared/enums/FormErrorMessages";
import * as yup from "yup";
import useAuthentication from "@domain/user/hooks/useAuthentication";
import useReactRouter from "use-react-router";
import { User } from "@domain/user/interfaces/User";
import Authentication from "@components/Authentication";

const validationSchema = yup.object().shape({
  name: yup.string().required(FormErrorMessages.REQUIRED_FIELD),
  email: yup
    .string()
    .email(FormErrorMessages.EMAIL_FIELD)
    .required(FormErrorMessages.REQUIRED_FIELD),
  password: yup.string().required(FormErrorMessages.REQUIRED_FIELD),
});

const SignUp: React.FunctionComponent = () => {
  const [isLoading, setIsLoading] = React.useState(false);

  const { signUp } = useAuthentication();
  const { history } = useReactRouter();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (data: User) => {
      try {
        setIsLoading(true);
        await signUp(data);
        alert("account created");
        history.push(UserRoutes.SIGN_IN);
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
              <Title title="Create a new account" />
            </Flex>
            <Flex alignItems="center" justifyContent="center" mb={20} mt={30}>
              <Box width={[320, 400]}>
                <form onSubmit={formik.handleSubmit}>
                  <InputText
                    name="name"
                    onChange={formik.handleChange}
                    value={formik.values.name}
                    invalid={formik.touched.name && formik.errors.name}
                    placeholder="Name"
                  />
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
                    mt={30}
                    flexDirection="column"
                  >
                    <Box width={200} mb={10} height={40}>
                      <Button disabled={isLoading} type="submit">
                        Sign up
                      </Button>
                    </Box>

                    <HyperLink href={UserRoutes.SIGN_IN}>
                      Already have an account?
                    </HyperLink>
                  </Flex>
                </form>
              </Box>
            </Flex>
          </Card>
        </Flex>
      </Authentication.Authenticated>
    </>
  );
};

export default SignUp;
