import {TaskStatus, Task, User } from '../models';


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

export default {getTasksByProjectId, createTask, updateTask};
