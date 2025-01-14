import express from 'express';
import workspaceController from "../controllers/workspaceController";
import userController from "../controllers/userController";
import projectController from "../controllers/projectController";

let router = express.Router();

const initAPIRoute = (app) => {
    router.get('/users', userController.getAllUsers);
    router.get('/workspaces', workspaceController.getAllWorkspaces);
    router.get('/users/:userId/workspaces', workspaceController.getWorkspacesByUserId);
    router.get('/workspace/:workspaceId/projects', projectController.getProjectsByWorkspaceId);

    router.post('/create-user', userController.createUser);
    router.post('/login', userController.handleLogin);

    return app.use("/api/v1/", router);
};

export default initAPIRoute;
