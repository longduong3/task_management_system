import { Workspace, User, RefWorkspaceUser, Project} from '../models';
import bcrypt from 'bcryptjs';
import { sequelize } from '../models';
import { Op } from 'sequelize';

let getWorkspacesByUserId = async (req, res) => {
    try {
        const userId = req.params.userId;
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({
                message: 'User không tồn tại.'
            });
        }

        const user_with_workspaces = await User.findOne({
            where: { id: userId },
            include: [{
                model: Workspace,
                as: 'workspaces',
                through: {
                    attributes: ['role', 'joined_at'],
                },
                attributes: ['id', 'name'],
                include: [{
                    model: Project,
                    as: 'projects',
                    attributes: [
                        'id',
                        'name',
                        'description',
                        'status',
                        'createdAt',
                        'updatedAt'
                    ]
                }]
            }]
        });

        if (!user_with_workspaces || !user_with_workspaces.workspaces.length) {
            return res.status(404).json({
                message: 'User chưa tham gia workspace nào.'
            });
        }

        const data = user_with_workspaces.workspaces.map(workspace => ({
            workspace_id: workspace.id,
            workspace_name: workspace.name,
            role: workspace.RefWorkspaceUser.role,
            joined_at: workspace.RefWorkspaceUser.joined_at,
            projects: workspace.projects.map(project => ({
                id: project.id,
                name: project.name,
                description: project.description,
                status: project.status,
                created_at: project.createdAt,
                updated_at: project.updatedAt
            }))
        }));

        return res.status(200).json({
            message: 'Danh sách workspace và projects của user.',
            data: data
        });

    } catch (error) {
        console.error('Error fetching workspaces and projects:', error);
        return res.status(500).json({
            message: 'Đã xảy ra lỗi khi lấy danh sách workspace và projects.',
            error: error.message
        });
    }
};

let getAllWorkspaces = async (req, res) => {
    try {
        const workspaces = await Workspace.findAll({
            attributes: ['id', 'name', 'owner_id'],
        });

        if (!workspaces || workspaces.length === 0) {
            return res.status(404).json({
                message: 'Không tìm thấy workspace nào.'
            });
        }

        return res.status(200).json({
            message: 'Danh sách tất cả workspaces.',
            data: workspaces
        });
    } catch (error) {
        console.error('Error fetching workspaces:', error);
        return res.status(500).json({
            message: 'Đã xảy ra lỗi khi lấy danh sách workspaces.',
            error: error.message
        });
    }
};

let createWorkspace = async (req, res) => {
    try {
        const { name, owner_id } = req.body;

        const existingWorkSpace = await Workspace.findOne({ where: { name } });
        if (existingWorkSpace) {
            return res.status(400).json({
                message: 'Space had been available.',
            });
        }

        const result = await sequelize.transaction(async (t) => {
            const newWorkSpace = await Workspace.create({
                name,
                owner_id,
            }, { transaction: t });

            await RefWorkspaceUser.create({
                workspace_id: newWorkSpace.id,
                user_id: owner_id,
                role: 'owner',
                joined_at: new Date()
            }, { transaction: t });

            return newWorkSpace;
        });

        const workspaceWithUser = await Workspace.findOne({
            where: { id: result.id },
            include: [{
                model: User,
                as: 'users',
                through: { attributes: ['role', 'joined_at'] }
            }]
        });

        return res.status(201).json({
            message: 'Success.',
            data: workspaceWithUser,
        });

    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({
            message: 'Error creating workspace.',
            error: error.message,
        });
    }
}

// Thêm hàm updateWorkspace
const updateWorkspace = async (req, res) => {
    try {
        const workspaceId = req.params.workspaceId;
        const userId = req.user.id;
        const { name } = req.body;

        if (!name || name.trim().length === 0) {
            return res.status(400).json({
                message: 'Tên workspace không được để trống'
            });
        }

        const workspace = await Workspace.findByPk(workspaceId);
        if (!workspace) {
            return res.status(404).json({
                message: 'Workspace không tồn tại'
            });
        }

        const userWorkspace = await RefWorkspaceUser.findOne({
            where: {
                workspace_id: workspaceId,
                user_id: userId,
                role: 'owner'
            }
        });

        if (!userWorkspace) {
            return res.status(403).json({
                message: 'Bạn không có quyền sửa workspace này'
            });
        }

        const existingWorkspace = await Workspace.findOne({
            where: {
                name: name,
                id: { [Op.ne]: workspaceId }
            }
        });

        if (existingWorkspace) {
            return res.status(400).json({
                message: 'Tên workspace đã tồn tại'
            });
        }

        await workspace.update({ name });

        const updatedWorkspace = await Workspace.findOne({
            where: { id: workspaceId },
            include: [{
                model: User,
                as: 'users',
                through: {
                    attributes: ['role', 'joined_at']
                },
                attributes: ['id', 'name', 'email']
            }]
        });

        return res.status(200).json({
            message: 'Cập nhật workspace thành công',
            data: updatedWorkspace
        });

    } catch (error) {
        console.error('Error updating workspace:', error);
        return res.status(500).json({
            message: 'Đã xảy ra lỗi khi cập nhật workspace',
            error: error.message
        });
    }
};

const deleteWorkspace = async (req, res) => {
    try {
        const workspaceId = req.params.workspaceId;
        const userId = req.user.id;

        const workspace = await Workspace.findByPk(workspaceId);
        if (!workspace) {
            return res.status(404).json({
                message: 'Workspace không tồn tại'
            });
        }

        const userWorkspace = await RefWorkspaceUser.findOne({
            where: {
                workspace_id: workspaceId,
                user_id: userId,
                role: 'owner'
            }
        });

        if (!userWorkspace) {
            return res.status(403).json({
                message: 'Bạn không có quyền xóa workspace này'
            });
        }

        const projects = await Project.findAll({
            where: { workspace_id: workspaceId }
        });

        if (projects.length > 0) {
            const projectNames = projects.map(p => p.name).join(', ');
            return res.status(400).json({
                message: `Không thể xóa workspace đang có projects: ${projectNames}. Vui lòng xóa projects trước.`
            });
        }

        await sequelize.transaction(async (t) => {
            await RefWorkspaceUser.destroy({
                where: { workspace_id: workspaceId },
                transaction: t
            });

            await workspace.destroy({ transaction: t });
        });

        return res.status(200).json({
            message: 'Xóa workspace thành công'
        });

    } catch (error) {
        console.error('Error deleting workspace:', error);
        return res.status(500).json({
            message: 'Đã xảy ra lỗi khi xóa workspace',
            error: error.message
        });
    }
};

export default {getWorkspacesByUserId, getAllWorkspaces, createWorkspace, updateWorkspace, deleteWorkspace};
