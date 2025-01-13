import express from 'express';
import ApiController from "../controllers/apiController";
import userController from "../controllers/userController";

let router = express.Router();

const initAPIRoute = (app) => {
    router.get('/users', userController.getAllUsers);
    router.get('/workspaces', ApiController.getAllWorkspaces);
    router.get('/users/:userId/workspaces', ApiController.getWorkspacesByUserId);

    router.post('/create-user', userController.createUser);
    router.post('/login', userController.handleLogin);

    return app.use("/api/v1/", router);
};

export default initAPIRoute;
