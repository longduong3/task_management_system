import { Workspace, Project, TaskStatus, Task, User, RefTaskAssignees } from '../models';


const getProjectsByWorkspaceId = async (req, res) => {
    try {
        const workspaceId = req.params.workspaceId;

        // Kiểm tra workspace có tồn tại không
        const workspace = await Workspace.findByPk(workspaceId);
        if (!workspace) {
            return res.status(404).json({
                message: 'Workspace không tồn tại'
            });
        }

        // Lấy danh sách projects với thông tin liên quan
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

        // Kiểm tra có project nào không
        if (!projects || projects.length === 0) {
            return res.status(404).json({
                message: 'Không có project nào trong workspace này'
            });
        }

        // Format lại dữ liệu trước khi trả về
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

export default {getProjectsByWorkspaceId};
