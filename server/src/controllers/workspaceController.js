import { Workspace, User } from '../models';
import bcrypt from 'bcryptjs';


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
                attributes: ['id', 'name']
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
        }));

        return res.status(200).json({
            message: 'Danh sách workspace của user.',
            data: data
        });

    } catch (error) {
        console.error('Error fetching workspaces:', error);
        return res.status(500).json({
            message: 'Đã xảy ra lỗi khi lấy danh sách workspace.',
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

        const newWorkSpace = await Workspace.create({
            name,
            owner_id,
        });

        return res.status(201).json({
            message: 'Success.',
            data: newWorkSpace,
        });
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({
            message: 'Error creating workspace.',
            error: error.message,
        });
    }
}
export default {getWorkspacesByUserId, getAllWorkspaces, createWorkspace};
