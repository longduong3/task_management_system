import { Workspace, RefWorkspaceUser, User } from '../models';

let getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll();

        return res.status(200).json({
            message: 'Danh sách người dùng',
            data: users
        });
    } catch (error) {
        console.error('Error fetching users:', error);
        return res.status(500).json({
            message: 'Lỗi khi lấy dữ liệu người dùng',
            error: error.message
        });
    }
};

let createUser = async (req, res) => {
    try {
        const { name, email, password, gender, role } = req.body;

        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({
                message: 'Email đã tồn tại.',
            });
        }

        const newUser = await User.create({
            name,
            email,
            password,
            gender,
            role,
        });

        return res.status(201).json({
            message: 'Người dùng đã được tạo thành công.',
            data: newUser,
        });
    } catch (error) {
        console.error('Error creating user:', error);
        return res.status(500).json({
            message: 'Đã xảy ra lỗi khi tạo người dùng.',
            error: error.message,
        });
    }
};

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

export default { getAllUsers, createUser, getWorkspacesByUserId, getAllWorkspaces};
