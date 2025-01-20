import { Task, User, Comment} from '../models';

const createComment = async (req, res) => {
    try {
        const { task_id, content } = req.body;
        const user_id = req.user.id;

        if (!task_id || !content) {
            return res.status(400).json({
                message: 'Task ID và nội dung comment là bắt buộc'
            });
        }

        const task = await Task.findByPk(task_id);
        if (!task) {
            return res.status(404).json({
                message: 'Task không tồn tại'
            });
        }

        const comment = await Comment.create({
            task_id,
            user_id,
            content
        });

        const commentWithUser = await Comment.findOne({
            where: { id: comment.id },
            include: [{
                model: User,
                attributes: ['id', 'name', 'email']
            }]
        });

        return res.status(201).json({
            message: 'Tạo comment thành công',
            data: commentWithUser
        });

    } catch (error) {
        console.error('Error creating comment:', error);
        return res.status(500).json({
            message: 'Đã xảy ra lỗi khi tạo comment',
            error: error.message
        });
    }
};

const updateComment = async (req, res) => {
    try {
        const { commentId } = req.params;
        const { content } = req.body;
        const userId = req.user.id;

        if (!content) {
            return res.status(400).json({
                message: 'Nội dung comment là bắt buộc'
            });
        }

        const comment = await Comment.findByPk(commentId);
        if (!comment) {
            return res.status(404).json({
                message: 'Comment không tồn tại'
            });
        }

        if (comment.user_id !== userId) {
            return res.status(403).json({
                message: 'Bạn không có quyền sửa comment này'
            });
        }

        await comment.update({ content });

        const updatedComment = await Comment.findOne({
            where: { id: commentId },
            include: [{
                model: User,
                attributes: ['id', 'name', 'email']
            }]
        });

        return res.status(200).json({
            message: 'Cập nhật comment thành công',
            data: updatedComment
        });

    } catch (error) {
        console.error('Error updating comment:', error);
        return res.status(500).json({
            message: 'Đã xảy ra lỗi khi cập nhật comment',
            error: error.message
        });
    }
};

const deleteComment = async (req, res) => {
    try {
        const { commentId } = req.params;
        const userId = req.user.id;

        const comment = await Comment.findByPk(commentId);
        if (!comment) {
            return res.status(404).json({
                message: 'Comment không tồn tại'
            });
        }

        if (comment.user_id !== userId) {
            return res.status(403).json({
                message: 'Bạn không có quyền xóa comment này'
            });
        }

        await comment.destroy();

        return res.status(200).json({
            message: 'Xóa comment thành công'
        });

    } catch (error) {
        console.error('Error deleting comment:', error);
        return res.status(500).json({
            message: 'Đã xảy ra lỗi khi xóa comment',
            error: error.message
        });
    }
};

const getCommentsByTaskId = async (req, res) => {
    try {
        const { taskId } = req.params;
        const { page = 1, limit = 10 } = req.query;

        const comments = await Comment.findAndCountAll({
            where: { task_id: taskId },
            include: [{
                model: User,
                attributes: ['id', 'name', 'email']
            }],
            order: [['createdAt', 'DESC']],
            limit: parseInt(limit),
            offset: (page - 1) * limit
        });

        return res.status(200).json({
            message: 'Lấy danh sách comment thành công',
            data: {
                comments: comments.rows,
                pagination: {
                    total: comments.count,
                    page: parseInt(page),
                    total_pages: Math.ceil(comments.count / limit)
                }
            }
        });

    } catch (error) {
        console.error('Error getting comments:', error);
        return res.status(500).json({
            message: 'Đã xảy ra lỗi khi lấy danh sách comment',
            error: error.message
        });
    }
};

export default {createComment, updateComment, deleteComment, getCommentsByTaskId};