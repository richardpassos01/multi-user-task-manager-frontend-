import projectApi from "../api/projectApi";
import taskApi from "../api/taskApi";
import Project from "../interfaces/Project";
import Task from "../interfaces/Task";

const useProjectManager = () => {
  const createProject = async ({ name }: Project): Promise<Project | void> => {
    try {
      const project = await projectApi.create(name);

      return project;
    } catch (err) {
      alert("Unexpected Error");
    }
  };

  const updateProject = async (
    name: string,
    projectId: string
  ): Promise<void> => {
    try {
      return projectApi.update(name, projectId);
    } catch (err) {
      alert("Unexpected Error");
    }
  };

  const removeProject = async (projectId: string): Promise<void> => {
    try {
      return projectApi.remove(projectId);
    } catch (err) {
      alert("Unexpected Error");
    }
  };

  const createTask = async ({
    description,
    projectId,
  }: Task): Promise<Task | void> => {
    try {
      const task = await taskApi.create(description, projectId);

      return task;
    } catch (err) {
      alert("Unexpected Error");
    }
  };

  const removeTask = async (taskId: string, projectId: string): Promise<void> => {
    try {
      return taskApi.remove(taskId, projectId);
    } catch (err) {
      alert("Unexpected Error");
    }
  };
  const completeTask = async (taskId: string, projectId: string): Promise<void> => {
    try {
      return taskApi.complete(taskId, projectId);
    } catch (err) {
      alert("Unexpected Error");
    }
  };

  return {
    createProject,
    updateProject,
    removeProject,
    createTask,
    removeTask,
    completeTask
  };
};

export default useProjectManager;
