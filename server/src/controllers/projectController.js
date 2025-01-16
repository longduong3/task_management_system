import { Workspace, Project, TaskStatus, Task, User, RefTaskAssignees } from '../models';
import { sequelize } from '../models';

const getProjectsByWorkspaceId = async (req, res) => {
    try {
        const workspaceId = req.params.workspaceId;

        const workspace = await Workspace.findByPk(workspaceId);
        if (!workspace) {
            return res.status(404).json({
                message: 'Workspace không tồn tại'
            });
        }

        const projects = await Project.findAll({
            where: {
                workspace_id: workspaceId,
            },
            include: [
                {
                    model: TaskStatus,
                    attributes: ['id', 'name', 'color', 'sequence']
                },
                {
                    model: Task,
                    attributes: [
                        'id', 'name', 'description', 'priority',
                        'due_date', 'status_id'
                    ],
                    include: [
                        {
                            model: User,
                            as: 'assignees',
                            attributes: ['id', 'name', 'email'],
                            through: { attributes: ['assigned_at'] }
                        }
                    ]
                }
            ],
            attributes: [
                'id', 'name', 'description', 'status',
                'createdAt', 'updatedAt'
            ],
            order: [
                ['createdAt', 'DESC'],
                [TaskStatus, 'sequence', 'ASC'],
                [Task, 'due_date', 'ASC']
            ]
        });

        if (!projects || projects.length === 0) {
            return res.status(404).json({
                message: 'Không có project nào trong workspace này'
            });
        }

        const formattedProjects = projects.map(project => ({
            id: project.id,
            name: project.name,
            description: project.description,
            status: project.status,
            created_at: project.createdAt,
            updated_at: project.updatedAt,
            task_statuses: project.TaskStatuses.map(status => ({
                id: status.id,
                name: status.name,
                color: status.color,
                sequence: status.sequence
            })),
            tasks: project.Tasks.map(task => ({
                id: task.id,
                name: task.name,
                description: task.description,
                priority: task.priority,
                due_date: task.due_date,
                status_id: task.status_id,
                assignees: task.assignees.map(assignee => ({
                    id: assignee.id,
                    name: assignee.name,
                    email: assignee.email,
                    assigned_at: assignee.RefTaskAssignees.assigned_at
                }))
            }))
        }));

        return res.status(200).json({
            message: 'Lấy danh sách project thành công',
            data: formattedProjects
        });

    } catch (error) {
        console.error('Error getting projects:', error);
        return res.status(500).json({
            message: 'Đã xảy ra lỗi khi lấy danh sách project',
            error: error.message
        });
    }
};

const createProject = async (req, res) => {
    try {
        const { workspace_id, name, description, status = 'active' } = req.body;

        if (!workspace_id || !name) {
            return res.status(400).json({
                message: 'Workspace ID và tên project là bắt buộc'
            });
        }

        const workspace = await Workspace.findByPk(workspace_id);
        if (!workspace) {
            return res.status(404).json({
                message: 'Workspace không tồn tại'
            });
        }

        const project = await Project.create({
            workspace_id,
            name,
            description,
            status
        });

        const defaultStatuses = [
            { name: 'To Do', color: '#E2E8F0', sequence: 1 },
            { name: 'In Progress', color: '#3182CE', sequence: 2 },
            { name: 'Done', color: '#48BB78', sequence: 3 }
        ];

        await Promise.all(defaultStatuses.map(status =>
            TaskStatus.create({
                ...status,
                project_id: project.id
            })
        ));

        const projectWithStatuses = await Project.findOne({
            where: { id: project.id },
            include: [{
                model: TaskStatus,
                attributes: ['id', 'name', 'color', 'sequence']
            }]
        });

        return res.status(201).json({
            message: 'Tạo project thành công',
            data: projectWithStatuses
        });

    } catch (error) {
        console.error('Error creating project:', error);
        return res.status(500).json({
            message: 'Đã xảy ra lỗi khi tạo project',
            error: error.message
        });
    }
};

const checkUserProjectPermission = async (userId, workspaceId) => {
    const userWorkspace = await RefWorkspaceUser.findOne({
        where: {
            user_id: userId,
            workspace_id: workspaceId
        }
    });
    if (!userWorkspace) {
        return false;
    }
    return ['owner', 'admin'].includes(userWorkspace.role);
};

const updateProject = async (req, res) => {
    try {
        const projectId = req.params.projectId;
        const userId = req.user.id;
        const { name, description, status } = req.body;

        if (!name || name.trim().length === 0) {
            return res.status(400).json({
                message: 'Tên project không được để trống'
            });
        }

        const project = await Project.findByPk(projectId);
        if (!project) {
            return res.status(404).json({
                message: 'Project không tồn tại'
            });
        }

        const workspace = await Workspace.findByPk(project.workspace_id);
        if (!workspace) {
            return res.status(404).json({
                message: 'Workspace không tồn tại'
            });
        }

        const hasPermission = await checkUserProjectPermission(userId, workspace.id);
        if (!hasPermission) {
            return res.status(403).json({
                message: 'Bạn không có quyền cập nhật project này'
            });
        }

        if (status && !['active', 'archived'].includes(status)) {
            return res.status(400).json({
                message: 'Status không hợp lệ. Chỉ chấp nhận giá trị "active" hoặc "archived"'
            });
        }

        const existingProject = await Project.findOne({
            where: {
                workspace_id: workspace.id,
                name: name,
                id: { [Op.ne]: projectId }
            }
        });

        if (existingProject) {
            return res.status(400).json({
                message: 'Tên project đã tồn tại trong workspace này'
            });
        }

        const updatedProject = await project.update({
            name: name || project.name,
            description: description || project.description,
            status: status || project.status
        });

        const projectWithDetails = await Project.findOne({
            where: { id: projectId },
            include: [{
                model: TaskStatus,
                attributes: ['id', 'name', 'color', 'sequence']
            }],
            attributes: [
                'id', 'name', 'description', 'status',
                'createdAt', 'updatedAt'
            ]
        });

        return res.status(200).json({
            message: 'Cập nhật project thành công',
            data: projectWithDetails
        });

    } catch (error) {
        console.error('Error updating project:', error);
        return res.status(500).json({
            message: 'Đã xảy ra lỗi khi cập nhật project',
            error: error.message
        });
    }
};

const deleteProject = async (req, res) => {
    try {
        const projectId = req.params.projectId;
        const userId = req.user.id;
        const project = await Project.findByPk(projectId);
        if (!project) {
            return res.status(404).json({
                message: 'Project không tồn tại'
            });
        }
        const workspace = await Workspace.findByPk(project.workspace_id);
        if (!workspace) {
            return res.status(404).json({
                message: 'Workspace không tồn tại'
            });
        }
        const hasPermission = await checkUserProjectPermission(userId, workspace.id);
        if (!hasPermission) {
            return res.status(403).json({
                message: 'Bạn không có quyền xóa project này'
            });
        }
        const tasksCount = await Task.count({
            where: { project_id: projectId }
        });
        if (tasksCount > 0) {
            return res.status(400).json({
                message: 'Không thể xóa project đang có tasks. Vui lòng xóa hết tasks trước'
            });
        }
        await sequelize.transaction(async (t) => {
            await TaskStatus.destroy({
                where: { project_id: projectId },
                transaction: t
            });
            await project.destroy({ transaction: t });
        });
        return res.status(200).json({
            message: 'Xóa project thành công'
        });
    } catch (error) {
        console.error('Error deleting project:', error);
        return res.status(500).json({
            message: 'Đã xảy ra lỗi khi xóa project',
            error: error.message
        });
    }
};

export default {getProjectsByWorkspaceId, createProject, updateProject, deleteProject};
