import express from 'express';
import ApiController from "../controllers/apiController";

let router = express.Router();

const initAPIRoute = (app) => {
    router.get('/users', ApiController.getAllUsers);
    router.get('/workspaces', ApiController.getAllWorkspaces);
    router.get('/users/:userId/workspaces', ApiController.getWorkspacesByUserId);

    router.post('/create-user', ApiController.createUser);
    router.post('/create-workspace', ApiController.createWorkspace);

    return app.use("/api/v1/", router);
};

export default initAPIRoute;
