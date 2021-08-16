import * as React from "react";
import { Box, Flex } from "reflexbox";
import useProjectManager from "@domain/project-manager/hook/useProjectManager";
import { HeaderIcon } from "@components/Header/Header.styles";
import { Icons, theme } from "@styles";
import Checkbox from "@components/Checkbox";

interface Prop {
  task: any;
  refetch?: any;
}

const Task: React.FunctionComponent<Prop> = ({ task, refetch }) => {
  const [checkedBox, setCheckedBox] = React.useState(false);
  const { removeTask, completeTask } = useProjectManager();

  const finishTask = async () => {
    setCheckedBox(true);
    completeTask(task.id, task.projectId);
    refetch();
  };

  const deleteTask = async () => {
    await removeTask(task.id, task.projectId);
    refetch();
  };

  return (
    <>
      <Flex
        style={{ width: "70%" }}
        alignItems="center"
        justifyContent="space-between"
      >
        <Checkbox
          style={{ cursor: task.completedAt ? "" : "pointer" }}
          checked={task.completedAt ? true : checkedBox}
          onClick={finishTask}
        />
        <Box ml={1}>
          <span style={{ color: theme.primary.black }}>{task.description}</span>
        </Box>
        {!task.completedAt && (
          <>
            <HeaderIcon
              src={Icons.Trash}
              style={{ cursor: "pointer" }}
              onClick={deleteTask}
            />
          </>
        )}
        {task.completedAt && (
          <span style={{ color: theme.primary.black }}>
            {new Date(task.completedAt).getFullYear()}-
            {new Date(task.completedAt).getMonth()}-
            {new Date(task.completedAt).getDate()}
          </span>
        )}
      </Flex>
    </>
  );
};

export default Task;
