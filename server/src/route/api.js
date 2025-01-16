import express from 'express';
import workspaceController from "../controllers/workspaceController";
import userController from "../controllers/userController";
import projectController from "../controllers/projectController";
import taskController from "../controllers/taskController";
import checkAuthentication from '../middlewares/checkAuthentication';

let router = express.Router();

const initAPIRoute = (app) => {
    // Public routes
    router.post('/create-user', userController.createUser);
    router.post('/login', userController.handleLogin);

    // Protected routes
    router.get('/users', checkAuthentication, userController.getAllUsers);

    // Workspace routes
    router.post('/create-workspace', checkAuthentication, workspaceController.createWorkspace);
    router.get('/users/:userId/workspaces', checkAuthentication, workspaceController.getWorkspacesByUserId);
    router.get('/workspaces', checkAuthentication, workspaceController.getAllWorkspaces);
    router.put('/update-workspaces/:workspaceId', checkAuthentication, workspaceController.updateWorkspace);
    router.delete('/delete-workspaces/:workspaceId', checkAuthentication, workspaceController.deleteWorkspace);

    // Project routes
    router.post('/create-project', checkAuthentication, projectController.createProject);
    router.get('/workspace/:workspaceId/projects', checkAuthentication, projectController.getProjectsByWorkspaceId);
    router.put('/update-projects/:projectId', checkAuthentication, projectController.updateProject);
    router.delete('/delete-projects/:projectId', checkAuthentication, projectController.deleteProject);

    // Task routes
    router.post('/create-task', checkAuthentication, taskController.createTask);
    router.get('/workspace/projects/:projectId/tasks', checkAuthentication, taskController.getTasksByProjectId);

    return app.use("/api/v1/", router);
};

export default initAPIRoute;