import express from 'express';
import workspaceController from "../controllers/workspaceController";
import userController from "../controllers/userController";

let router = express.Router();

const initAPIRoute = (app) => {
    router.get('/users', userController.getAllUsers);
    router.get('/workspaces', workspaceController.getAllWorkspaces);
    router.get('/users/:userId/workspaces', workspaceController.getWorkspacesByUserId);

    router.post('/create-user', userController.createUser);
    router.post('/login', userController.handleLogin);

    return app.use("/api/v1/", router);
};

export default initAPIRoute;
