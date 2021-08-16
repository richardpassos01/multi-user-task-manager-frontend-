enum Endpoints {
  LIST_PROJECTS_AND_TASKS = '/projects',
  CREATE_PROJECT = '/project',
  UPDATE_OR_DELETE_PROJECT = '/project/:projectId',
  CREATE_TASK = '/task/:projectId',
  DELETED_TASK = '/task/:projectId/:id',
  COMPLETE_TASK = '/task/:projectId/:id/complete'
}

export default Endpoints;
