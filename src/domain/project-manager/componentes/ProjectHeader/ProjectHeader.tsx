import * as React from "react";
import InputText from "@components/InputText";
import { Box, Flex } from "reflexbox";
import { useFormik } from "formik2";
import { FormErrorMessages } from "@domain/shared/enums/FormErrorMessages";
import * as yup from "yup";
import Project from "@domain/project-manager/interfaces/Project";
import useProjectManager from "@domain/project-manager/hook/useProjectManager";
import { HeaderIcon } from "@components/Header/Header.styles";
import HyperLink from "@components/HyperLink";
import styled from "styled-components";
import { Icons, theme } from "@styles";

const validationSchema = yup.object().shape({
  name: yup.string().required(FormErrorMessages.REQUIRED_FIELD),
});

interface Prop {
  name: string;
  projectId: string;
  refetch: any;
}

interface InputProps {
  disabled: boolean;
}

const CustomInput = styled(InputText)<InputProps>`
  ${(props) =>
    props.disabled &&
    `
    background: none;
    font-family: Poppins;
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 24px; 
    color: ${theme.primary.black}; 
    border: none;
  `}
`;

const ProjectHeader: React.FunctionComponent<Prop> = ({ name, projectId, refetch }) => {
  const [editTitle, setEditTitle] = React.useState(false);

  const { updateProject, removeProject } = useProjectManager();

  const formik = useFormik({
    initialValues: {
      name,
    },
    validationSchema,
    onSubmit: async (data: Project) => {},
  });

  const cancelEdition = () => {
    formik.values.name = name;
    setEditTitle(false);
  };

  const editProject = async () => {
    await updateProject(formik.values.name, projectId);
    refetch();
  };

  const deleteProject = async () => {
    await removeProject(projectId);
    refetch();
  };

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <Flex
          justifyContent="center"
          style={{
            backgroundColor: theme.secondary.darkGrey,
            borderRadius: "10px 10px 0 0",
          }}
        >
          <Flex
            alignItems="center"
            justifyContent="center"
            flexDirection="row"
            mt={20}
            mb={20}
          >
            <CustomInput
              name="name"
              onChange={formik.handleChange}
              value={formik.values.name}
              invalid={formik.touched.name && formik.errors.name}
              placeholder="Name"
              disabled={!editTitle}
            />
            <Box
              width={100}
              height={40}
              ml={10}
              mt={formik.touched.name && formik.errors.name ? -11 : 10}
            >
              {!editTitle && (
                <>
                  <HeaderIcon
                    src={Icons.Edit}
                    style={{ cursor: "pointer" }}
                    onClick={() => setEditTitle(true)}
                  />
                  <HeaderIcon
                    src={Icons.Trash}
                    style={{ cursor: "pointer" }}
                    onClick={deleteProject}
                  />
                </>
              )}
              {editTitle && (
                <>
                  <HyperLink
                    style={{ marginLeft: "20px" }}
                    onClick={editProject}
                  >
                    Save
                  </HyperLink>
                  <HyperLink
                    style={{ paddingLeft: "10px" }}
                    onClick={cancelEdition}
                  >
                    Cancel
                  </HyperLink>
                </>
              )}
            </Box>
          </Flex>
        </Flex>
      </form>
    </>
  );
};

export default ProjectHeader;
