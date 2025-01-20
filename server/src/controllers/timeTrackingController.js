import { Task, User, TimeTracking} from '../models';

const startTimeTracking = async (req, res) => {
    try {
        const { task_id } = req.body;
        const user_id = req.user.id;

        // Check if task exists
        const task = await Task.findByPk(task_id);
        if (!task) {
            return res.status(404).json({
                message: 'Task không tồn tại'
            });
        }

        // Check if there's already an active tracking
        const activeTracking = await TimeTracking.findOne({
            where: {
                user_id,
                end_time: null
            }
        });

        if (activeTracking) {
            return res.status(400).json({
                message: 'Bạn đang có một time tracking đang chạy'
            });
        }

        const timeTracking = await TimeTracking.create({
            task_id,
            user_id,
            start_time: new Date(),
            end_time: null
        });

        return res.status(201).json({
            message: 'Bắt đầu time tracking thành công',
            data: timeTracking
        });

    } catch (error) {
        console.error('Error starting time tracking:', error);
        return res.status(500).json({
            message: 'Đã xảy ra lỗi khi bắt đầu time tracking',
            error: error.message
        });
    }
};

const stopTimeTracking = async (req, res) => {
    try {
        const userId = req.user.id;

        const activeTracking = await TimeTracking.findOne({
            where: {
                user_id: userId,
                end_time: null
            }
        });

        if (!activeTracking) {
            return res.status(404).json({
                message: 'Không tìm thấy time tracking đang chạy'
            });
        }

        activeTracking.end_time = new Date();
        await activeTracking.save();

        return res.status(200).json({
            message: 'Dừng time tracking thành công',
            data: activeTracking
        });

    } catch (error) {
        console.error('Error stopping time tracking:', error);
        return res.status(500).json({
            message: 'Đã xảy ra lỗi khi dừng time tracking',
            error: error.message
        });
    }
};

const getTimeTrackingByTaskId = async (req, res) => {
    try {
        const { taskId } = req.params;
        const { page = 1, limit = 10 } = req.query;

        const timeTracking = await TimeTracking.findAndCountAll({
            where: { task_id: taskId },
            include: [{
                model: User,
                attributes: ['id', 'name', 'email']
            }],
            order: [['start_time', 'DESC']],
            limit: parseInt(limit),
            offset: (page - 1) * limit
        });

        return res.status(200).json({
            message: 'Lấy danh sách time tracking thành công',
            data: {
                records: timeTracking.rows,
                pagination: {
                    total: timeTracking.count,
                    page: parseInt(page),
                    total_pages: Math.ceil(timeTracking.count / limit)
                }
            }
        });

    } catch (error) {
        console.error('Error getting time tracking records:', error);
        return res.status(500).json({
            message: 'Đã xảy ra lỗi khi lấy danh sách time tracking',
            error: error.message
        });
    }
};

export default {startTimeTracking, stopTimeTracking, getTimeTrackingByTaskId};