import * as React from "react";
import { Flex, Box } from "reflexbox/styled-components";
import Header from "@components/Header";
import Card from "@components/Card";
import Line from "@components/Line";
import { theme } from "@styles";
import CreateProject from "@domain/project-manager/componentes/CreateProject/CreateProject";
import CreateTask from "@domain/project-manager/componentes/CreateTask/CreateTask";
import ProjectHeader from "@domain/project-manager/componentes/ProjectHeader/ProjectHeader";
import useAxios from "axios-hooks";
import ENDPOINTS from "../../api/endpoints";
import Loader from "@components/Loader";
import Task from "@domain/project-manager/componentes/Task/Task";

const Dashboard: React.FunctionComponent = () => {
  const [{ data: projects, loading }, refetch] = useAxios(
    ENDPOINTS.LIST_PROJECTS_AND_TASKS
  );

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <Header enableLogout={true} />
      <CreateProject refetch={refetch} />

      <Flex
        alignItems="baseline"
        justifyContent="center"
        mt={40}
        flexDirection={["column", "row"]}
        flexWrap={['nowrap', 'wrap']}
      >
        {projects?.map((project: any) => (
          <>
            <Flex justifyContent="center" ml={20} mt={[20, 0]}>
              <Card width={[300, 400]}>
                <ProjectHeader
                  name={project.name}
                  projectId={project.id}
                  refetch={refetch}
                />
                <Flex
                  alignItems="center"
                  justifyContent="center"
                  mb={20}
                  mt={30}
                  flexDirection="column"
                >
                  <Flex width={[200, 350]} flexDirection="column">
                    <h3 style={{ color: theme.primary.black }}>Todo</h3>
                    <Flex flexDirection="column">
                      {project.tasks?.map((task: any) => {
                        if (!task.completedAt) {
                          return (
                            <Box mb={10}>
                              <Task task={task} refetch={refetch} />
                            </Box>
                          );
                        } else {
                          return <div></div>
                        }
                      })}
                    </Flex>
                  </Flex>

                  <Flex width={[200, 350]} flexDirection="column">
                    <h3 style={{ color: theme.primary.black }}>Done</h3>
                    <Flex flexDirection="column">
                      {project.tasks?.map((task: any) => {
                        if (task.completedAt) {
                          return (
                            <Box mb={10}>
                              <Task task={task} refetch={refetch} />
                            </Box>
                          );
                        } else {
                          return <div></div>
                        }
                      })}
                    </Flex>
                  </Flex>
                </Flex>

                <Box mt={20}>
                  <Line />
                </Box>

                <CreateTask refetch={refetch} projectId={project.id} />
              </Card>
            </Flex>
          </>
        ))}
      </Flex>
    </>
  );
};

export default Dashboard;
