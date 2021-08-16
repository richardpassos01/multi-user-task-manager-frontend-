import * as React from "react";
import Button from "@components/Button";
import InputText from "@components/InputText";
import { Box, Flex } from "reflexbox";
import { useFormik } from "formik2";
import { FormErrorMessages } from "@domain/shared/enums/FormErrorMessages";
import * as yup from "yup";
import Project from "@domain/project-manager/interfaces/Project";
import useProjectManager from "@domain/project-manager/hook/useProjectManager";

const validationSchema = yup.object().shape({
  name: yup.string().required(FormErrorMessages.REQUIRED_FIELD),
});

interface Prop {
  refetch: any
}

const CreateProject: React.FunctionComponent<Prop> = ({
  refetch
}) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const { createProject } = useProjectManager();

  const formik = useFormik({
    initialValues: {
      name: "",
    },
    validationSchema,
    onSubmit: async (data: Project) => {
      setIsLoading(true);
      try {
        await createProject(data);
        setIsLoading(false);
        refetch();
      } catch (error) {
        alert("unexpected error");
        setIsLoading(false);
      }
    },
  });

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <Flex justifyContent="flex-end">
          <Flex
            alignItems="center"
            justifyContent="center"
            flexDirection="row"
            mr={[10, 250]}
            mt={20}
          >
            <InputText
              name="name"
              onChange={formik.handleChange}
              value={formik.values.name}
              invalid={formik.touched.name && formik.errors.name}
              placeholder="Name"
            />
            <Box
              width={150}
              height={40}
              ml={10}
              mt={formik.touched.name && formik.errors.name ? -11 : 10}
            >
              <Button disabled={isLoading} type="submit">
                New Project
              </Button>
            </Box>
          </Flex>
        </Flex>
      </form>
    </>
  );
};

export default CreateProject;
