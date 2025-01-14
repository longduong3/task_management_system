import express from 'express';
import workspaceController from "../controllers/workspaceController";
import userController from "../controllers/userController";
import projectController from "../controllers/projectController";
import taskController from "../controllers/taskController";
import commentController from "../controllers/commentController";
import timeTrackingController from "../controllers/timeTrackingController";
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
    router.post('/create-status-task', checkAuthentication, taskController.createTaskStatus);
    router.get('/workspace/projects/:projectId/tasks', checkAuthentication, taskController.getTasksByProjectId);
    router.get('/workspace/projects/:projectId/status-task', checkAuthentication, taskController.getTaskStatusByProjectId);
    router.delete('/delete-tasks/:taskId', checkAuthentication, taskController.deleteTask);
    router.put('/update-tasks/:taskId', checkAuthentication, taskController.updateTask);
    router.put('/update-tasks/:taskId/status', checkAuthentication, taskController.updateTaskStatus);
    router.get('/detail-tasks/:taskId', checkAuthentication, taskController.getTaskDetail);



    // Comment routes
    router.post('/create-comments', checkAuthentication, commentController.createComment);
    router.put('/update-comments/:commentId', checkAuthentication, commentController.updateComment);
    router.delete('/delete-comments/:commentId', checkAuthentication, commentController.deleteComment);
    router.get('/tasks/:taskId/comments', checkAuthentication, commentController.getCommentsByTaskId);

    // Timetracking routes
    router.post('/time-tracking/start', checkAuthentication, timeTrackingController.startTimeTracking);
    router.put('/time-tracking/stop', checkAuthentication, timeTrackingController.stopTimeTracking);
    router.get('/tasks/:taskId/time-tracking', checkAuthentication, timeTrackingController.getTimeTrackingByTaskId);

    return app.use("/api/v1/", router);
};

export default initAPIRoute;
