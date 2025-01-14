import userService from '../services/userService';
import {User} from "../models";
import bcrypt from "bcryptjs";

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

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
            gender,
            role,
        });

        return res.status(201).json({
            message: 'Người dùng đã được tạo thành công.',
            data: {
                id: newUser.id,
                name: newUser.name,
                email: newUser.email,
                gender: newUser.gender,
                role: newUser.role,
            },
        });
    } catch (error) {
        console.error('Error creating user:', error);
        return res.status(500).json({
            message: 'Đã xảy ra lỗi khi tạo người dùng.',
            error: error.message,
        });
    }
};

let handleLogin = async (req, res) => {
    let email = req.body.email;
    let password = req.body.password;

    if(!email || !password){
        return res.status(500).send({
            errCode: 1,
            message: 'Missing inputs parameter!'
        })
    }
    let userData = await userService.handleUserLogin(email, password);

    return res.status(200).send({
        errCode: userData.errCode,
        message: userData.errMessage,
    })
}

export default { handleLogin, createUser, getAllUsers};