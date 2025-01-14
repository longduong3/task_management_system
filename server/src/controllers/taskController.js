import {TaskStatus, Task, User } from '../models';


const getTasksByProjectId = async (req, res) => {
    try {
        const projectId = req.params.projectId;
        const { page = 1, limit = 10, status, priority } = req.query;

        const where = { project_id: projectId };

        // Thêm filter nếu có
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

export default {getTasksByProjectId};
