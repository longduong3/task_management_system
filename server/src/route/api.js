import express from 'express';
import workspaceController from "../controllers/workspaceController";
import userController from "../controllers/userController";
import projectController from "../controllers/projectController";
import taskController from "../controllers/taskController";

let router = express.Router();

const initAPIRoute = (app) => {
    router.get('/users', userController.getAllUsers);
    router.get('/users/:userId/workspaces', workspaceController.getWorkspacesByUserId);
    router.get('/workspaces', workspaceController.getAllWorkspaces);
    router.get('/workspace/:workspaceId/projects', projectController.getProjectsByWorkspaceId);
    router.get('/workspace/projects/:projectId/tasks', taskController.getTasksByProjectId);

    router.post('/create-user', userController.createUser);
    router.post('/login', userController.handleLogin);
    router.post('/create-workspace', workspaceController.createWorkspace);

    return app.use("/api/v1/", router);
};

export default initAPIRoute;
