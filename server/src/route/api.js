import express from 'express';
import workspaceController from "../controllers/workspaceController";
import userController from "../controllers/userController";
import projectController from "../controllers/projectController";
import taskController from "../controllers/taskController";

let router = express.Router();

const initAPIRoute = (app) => {

    router.post('/create-user', userController.createUser);
    router.post('/login', userController.handleLogin);
    router.get('/users', userController.getAllUsers);

    router.post('/create-workspace', workspaceController.createWorkspace);
    router.get('/users/:userId/workspaces', workspaceController.getWorkspacesByUserId);
    router.get('/workspaces', workspaceController.getAllWorkspaces);
    router.put('/update-workspaces/:workspaceId', workspaceController.updateWorkspace);
    router.delete('/delete-workspaces/:workspaceId', workspaceController.deleteWorkspace);

    router.post('/create-project', projectController.createProject);
    router.get('/workspace/:workspaceId/projects', projectController.getProjectsByWorkspaceId);
    router.put('/update-projects/:projectId', projectController.updateProject);
    router.delete('/delete-projects/:projectId', projectController.deleteProject);

    router.post('/create-task', taskController.createTask);
    router.get('/workspace/projects/:projectId/tasks', taskController.getTasksByProjectId);

    return app.use("/api/v1/", router);
};

export default initAPIRoute;
