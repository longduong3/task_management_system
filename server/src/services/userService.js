import { User } from '../models';
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

let handleUserLogin = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {};
            let isExist = await checkUserEmail(email);
            if (isExist) {
                let user = await User.findOne({
                    where: { email: email }
                });
                if (user) {
                    let check = await bcrypt.compare(password, user.password);
                    if (check) {
                        if (!process.env.JWT_SECRET || !process.env.JWT_EXPIRES) {
                            throw new Error('JWT configuration missing in .env file');
                        }
                        const payload = {
                            id: user.id,
                            email: user.email,
                            name: user.name
                        };
                        const access_token = jwt.sign(
                            payload,
                            process.env.JWT_SECRET,
                            {
                                expiresIn: process.env.JWT_EXPIRES
                            }
                        );
                        userData.errCode = 0;
                        userData.errMessage = 'Login successful!';
                        userData.access_token = access_token;
                        userData.id = user.id;
                        userData.name = user.name;
                        userData.email = user.email;
                        resolve(userData);
                    } else {
                        userData.errCode = 3;
                        userData.errMessage = "Wrong password";
                        resolve(userData);
                    }
                } else {
                    userData.errCode = 2;
                    userData.errMessage = "User's not found";
                    resolve(userData);
                }
            } else {
                userData.errCode = 1;
                userData.errMessage = "Your email doesn't exist in the system. Please try again.";
                resolve(userData);
            }
        } catch (e) {
            console.error('Error in handleUserLogin:', e.message);
            reject(e);
        }
    });
};

let checkUserEmail = async (email) => {
    try {
        let user = await User.findOne({
            where: { email: email },
        });
        return !!user;
    } catch (error) {
        console.error('Error in checkUserEmail:', error.message);
        throw new Error(error.message || 'An error occurred while checking email');
    }
};

export default { handleUserLogin, checkUserEmail };
