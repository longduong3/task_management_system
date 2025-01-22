import {TaskStatus, Task, User} from '../models';


const getTasksByProjectId = async (req, res) => {
    try {
        const projectId = req.params.projectId;
        const { page = 1, limit = 10, status, priority } = req.query;

        const where = { project_id: projectId };

        if (status) where.status_id = status;
        if (priority) where.priority = priority;

        const tasks = await Task.findAndCountAll({
            where,
            include: [
                {
                    model: User,
                    as: 'assignees',
                    attributes: ['id', 'name', 'email'],
                    through: { attributes: ['assigned_at'] }
                },
                {
                    model: TaskStatus,
                    attributes: ['id', 'name', 'color']
                }
            ],
            limit: parseInt(limit),
            offset: (page - 1) * limit,
            order: [['due_date', 'ASC']]
        });

        return res.status(200).json({
            message: 'Lấy danh sách task thành công',
            data: {
                tasks: tasks.rows,
                pagination: {
                    total: tasks.count,
                    page: parseInt(page),
                    total_pages: Math.ceil(tasks.count / limit)
                }
            }
        });
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({
            message: 'Đã xảy ra lỗi',
            error: error.message
        });
    }
};

const createTask = async (req, res) => {
    try {
        const {
            project_id,
            name,
            description,
            assignee_ids,
            status_id,
            priority = 'normal',
            due_date,
            parent_id
        } = req.body;

        if (!project_id || !name || !status_id) {
            return res.status(400).json({
                message: 'Project ID, tên task và status là bắt buộc'
            });
        }

        const project = await Project.findByPk(project_id);
        if (!project) {
            return res.status(404).json({
                message: 'Project không tồn tại'
            });
        }

        const taskStatus = await TaskStatus.findOne({
            where: {
                id: status_id,
                project_id
            }
        });
        if (!taskStatus) {
            return res.status(404).json({
                message: 'Task status không hợp lệ'
            });
        }

        if (parent_id) {
            const parentTask = await Task.findOne({
                where: {
                    id: parent_id,
                    project_id
                }
            });
            if (!parentTask) {
                return res.status(404).json({
                    message: 'Parent task không tồn tại'
                });
            }
        }

        const task = await Task.create({
            project_id,
            name,
            description,
            status_id,
            priority,
            due_date,
            parent_id
        });

        if (assignee_ids && assignee_ids.length > 0) {
            const assigneeRecords = assignee_ids.map(assignee_id => ({
                task_id: task.id,
                assignee_id,
                assigned_at: new Date()
            }));

            await RefTaskAssignees.bulkCreate(assigneeRecords);
        }

        const taskWithDetails = await Task.findOne({
            where: { id: task.id },
            include: [
                {
                    model: User,
                    as: 'assignees',
                    attributes: ['id', 'name', 'email'],
                    through: { attributes: ['assigned_at'] }
                },
                {
                    model: TaskStatus,
                    attributes: ['id', 'name', 'color']
                }
            ]
        });

        return res.status(201).json({
            message: 'Tạo task thành công',
            data: taskWithDetails
        });

    } catch (error) {
        console.error('Error creating task:', error);
        return res.status(500).json({
            message: 'Đã xảy ra lỗi khi tạo task',
            error: error.message
        });
    }
};

const updateTask = async (req, res) => {
    try {
        const taskId = req.params.taskId;
        const {
            name,
            description,
            status_id,
            priority,
            due_date,
            assignee_ids
        } = req.body;

        // Verify task exists
        const task = await Task.findByPk(taskId);
        if (!task) {
            return res.status(404).json({
                message: 'Task không tồn tại'
            });
        }

        const result = await sequelize.transaction(async (t) => {
            // Update task basic information
            const updateData = {};
            if (name) updateData.name = name;
            if (description) updateData.description = description;
            if (status_id) updateData.status_id = status_id;
            if (priority) updateData.priority = priority;
            if (due_date) updateData.due_date = due_date;

            await task.update(updateData, { transaction: t });

            // Handle assignees if provided
            if (assignee_ids && Array.isArray(assignee_ids)) {
                // Verify all users exist
                const users = await User.findAll({
                    where: {
                        id: { [Op.in]: assignee_ids }
                    }
                });

                if (users.length !== assignee_ids.length) {
                    throw new Error('Một hoặc nhiều assignee không tồn tại');
                }

                // Remove existing assignees
                await RefTaskAssignees.destroy({
                    where: { task_id: taskId },
                    transaction: t
                });

                // Add new assignees
                const assigneeRecords = assignee_ids.map(assignee_id => ({
                    task_id: taskId,
                    assignee_id,
                    assigned_at: new Date()
                }));

                await RefTaskAssignees.bulkCreate(assigneeRecords, { transaction: t });
            }

            // Return updated task with assignees
            return Task.findOne({
                where: { id: taskId },
                include: [{
                    model: User,
                    as: 'assignees',
                    attributes: ['id', 'name', 'email'],
                    through: { attributes: ['assigned_at'] }
                }],
                transaction: t
            });
        });

        return res.status(200).json({
            message: 'Cập nhật task thành công',
            data: result
        });

    } catch (error) {
        console.error('Error updating task:', error);
        return res.status(500).json({
            message: 'Đã xảy ra lỗi khi cập nhật task',
            error: error.message
        });
    }
};

const deleteTask = async (req, res) => {
    try {
        const taskId = req.params.taskId;
        const userId = req.user.id;

        const task = await Task.findByPk(taskId, {
            include: [{
                model: Project,
                include: [{
                    model: Workspace
                }]
            }]
        });

        if (!task) {
            return res.status(404).json({
                message: 'Task không tồn tại'
            });
        }

        // Check permissions
        const workspace = task.Project.Workspace;
        const hasPermission = await checkUserProjectPermission(userId, workspace.id);
        if (!hasPermission) {
            return res.status(403).json({
                message: 'Bạn không có quyền xóa task này'
            });
        }

        await sequelize.transaction(async (t) => {
            // Delete related records
            await TimeTracking.destroy({
                where: { task_id: taskId },
                transaction: t
            });

            await Comment.destroy({
                where: { task_id: taskId },
                transaction: t
            });

            await Attachment.destroy({
                where: { task_id: taskId },
                transaction: t
            });

            await RefTaskAssignees.destroy({
                where: { task_id: taskId },
                transaction: t
            });

            await task.destroy({ transaction: t });
        });

        return res.status(200).json({
            message: 'Xóa task thành công'
        });

    } catch (error) {
        console.error('Error deleting task:', error);
        return res.status(500).json({
            message: 'Đã xảy ra lỗi khi xóa task',
            error: error.message
        });
    }
};

const updateTaskStatus = async (req, res) => {
    try {
        const { taskId } = req.params;
        const { status_id } = req.body;
        const userId = req.user.id;

        if (!status_id) {
            return res.status(400).json({
                message: 'Status ID là bắt buộc'
            });
        }

        const task = await Task.findByPk(taskId);
        if (!task) {
            return res.status(404).json({
                message: 'Task không tồn tại'
            });
        }

        const status = await TaskStatus.findOne({
            where: {
                id: status_id,
                project_id: task.project_id
            }
        });

        if (!status) {
            return res.status(404).json({
                message: 'Status không hợp lệ cho project này'
            });
        }

        await task.update({ status_id });

        const updatedTask = await Task.findOne({
            where: { id: taskId },
            include: [
                {
                    model: User,
                    as: 'assignees',
                    attributes: ['id', 'name', 'email'],
                    through: { attributes: ['assigned_at'] }
                },
                {
                    model: TaskStatus,
                    attributes: ['id', 'name', 'color']
                }
            ]
        });

        return res.status(200).json({
            message: 'Cập nhật trạng thái task thành công',
            data: updatedTask
        });

    } catch (error) {
        console.error('Error updating task status:', error);
        return res.status(500).json({
            message: 'Đã xảy ra lỗi khi cập nhật trạng thái task',
            error: error.message
        });
    }
};

const getTaskDetail = async (req, res) => {
    try {
        const taskId = req.params.taskId;

        const task = await Task.findOne({
            where: { id: taskId },
            include: [
                {
                    model: User,
                    as: 'assignees',
                    attributes: ['id', 'name', 'email'],
                    through: { attributes: ['assigned_at'] }
                },
                {
                    model: TaskStatus,
                    attributes: ['id', 'name', 'color']
                },
                {
                    model: Task,
                    as: 'subtasks',
                    include: [
                        {
                            model: User,
                            as: 'assignees',
                            attributes: ['id', 'name', 'email']
                        },
                        {
                            model: TaskStatus,
                            attributes: ['id', 'name', 'color']
                        }
                    ]
                },
                {
                    model: TimeTracking,
                    include: [{
                        model: User,
                        attributes: ['id', 'name', 'email']
                    }]
                }
            ]
        });

        if (!task) {
            return res.status(404).json({
                message: 'Task không tồn tại'
            });
        }

        return res.status(200).json({
            message: 'Lấy thông tin task thành công',
            data: task
        });

    } catch (error) {
        console.error('Error getting task details:', error);
        return res.status(500).json({
            message: 'Đã xảy ra lỗi khi lấy thông tin task',
            error: error.message
        });
    }
};

const getTaskStatusByProjectId = async (req, res) => {
    try {
        const { projectId } = req.params;

        // Validate project existence
        const project = await Project.findByPk(projectId);
        if (!project) {
            return res.status(404).json({
                message: 'Project không tồn tại'
            });
        }

        // Get task statuses with count of tasks in each status
        const taskStatuses = await TaskStatus.findAll({
            where: { project_id: projectId },
            include: [
                {
                    model: Project,
                    attributes: ['name']
                }
            ],
            attributes: [
                'id',
                'name',
                'color',
                'sequence',
                'createdAt',
                'updatedAt',
                [sequelize.literal('(SELECT COUNT(*) FROM task WHERE task.status_id = task_status.id)'), 'tasksCount']
            ],
            order: [['sequence', 'ASC']],
        });

        return res.status(200).json({
            message: 'Lấy danh sách status thành công',
            data: taskStatuses.map(status => ({
                id: status.id,
                name: status.name,
                color: status.color,
                sequence: status.sequence,
                project_name: status.Project.name,
                tasks_count: status.getDataValue('tasksCount'),
                created_at: status.createdAt,
                updated_at: status.updatedAt
            }))
        });

    } catch (error) {
        console.error('Error getting task statuses:', error);
        return res.status(500).json({
            message: 'Đã xảy ra lỗi khi lấy danh sách status',
            error: error.message
        });
    }
};

const createTaskStatus = async (req, res) => {
    try {
        const { project_id, name, color, sequence } = req.body;

        // Validate required fields
        if (!project_id || !name || !color) {
            return res.status(400).json({
                message: 'Project ID, tên và màu sắc của status là bắt buộc'
            });
        }

        // Validate project existence
        const project = await Project.findByPk(project_id);
        if (!project) {
            return res.status(404).json({
                message: 'Project không tồn tại'
            });
        }

        // Check if status name already exists in project
        const existingStatus = await TaskStatus.findOne({
            where: {
                project_id,
                name: {
                    [Op.iLike]: name // Case insensitive comparison
                }
            }
        });

        if (existingStatus) {
            return res.status(400).json({
                message: 'Status có tên này đã tồn tại trong project'
            });
        }

        // If sequence is not provided, place at the end
        let newSequence = sequence;
        if (!newSequence) {
            const maxSequence = await TaskStatus.max('sequence', {
                where: { project_id }
            });
            newSequence = (maxSequence || 0) + 1;
        }

        // Create new status
        const taskStatus = await TaskStatus.create({
            project_id,
            name,
            color,
            sequence: newSequence
        });

        // Get created status with project info
        const createdStatus = await TaskStatus.findOne({
            where: { id: taskStatus.id },
            include: [{
                model: Project,
                attributes: ['name']
            }]
        });

        return res.status(201).json({
            message: 'Tạo status thành công',
            data: {
                id: createdStatus.id,
                name: createdStatus.name,
                color: createdStatus.color,
                sequence: createdStatus.sequence,
                project_name: createdStatus.Project.name,
                created_at: createdStatus.createdAt,
                updated_at: createdStatus.updatedAt
            }
        });

    } catch (error) {
        console.error('Error creating task status:', error);
        return res.status(500).json({
            message: 'Đã xảy ra lỗi khi tạo status',
            error: error.message
        });
    }
};

export default {getTasksByProjectId, createTask, updateTask, deleteTask, updateTaskStatus, getTaskDetail, createTaskStatus, getTaskStatusByProjectId};
