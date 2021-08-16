import * as React from "react";
import Button from "@components/Button";
import InputText from "@components/InputText";
import { Box, Flex } from "reflexbox";
import { useFormik } from "formik2";
import { FormErrorMessages } from "@domain/shared/enums/FormErrorMessages";
import * as yup from "yup";
import useProjectManager from "@domain/project-manager/hook/useProjectManager";
import Task from "@domain/project-manager/interfaces/Task";

interface Props {
  projectId: string;
  refetch: any;
}

const validationSchema = yup.object().shape({
  description: yup.string().required(FormErrorMessages.REQUIRED_FIELD),
});

const CreateTask: React.FunctionComponent<Props> = ({ projectId, refetch }) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const { createTask } = useProjectManager();

  const formik = useFormik({
    initialValues: {
      projectId,
      description: "",
    },
    validationSchema,
    onSubmit: async (data: Task) => {
      setIsLoading(true);
      try {
        const task = await createTask(data);
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
        <Flex justifyContent="center">
          <Flex
            alignItems="center"
            justifyContent="center"
            flexDirection="row"
            mt={20}
            mb={20}
          >
            <InputText
              name="description"
              onChange={formik.handleChange}
              value={formik.values.description}
              invalid={formik.touched.description && formik.errors.description}
              placeholder="Task"
            />
            <Box
              width={150}
              height={40}
              ml={10}
              mt={
                formik.touched.description && formik.errors.description
                  ? -11
                  : 10
              }
            >
              <Button disabled={isLoading} type="submit">
                Add
              </Button>
            </Box>
          </Flex>
        </Flex>
      </form>
    </>
  );
};

export default CreateTask;
