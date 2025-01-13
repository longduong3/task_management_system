import { User } from '../models';
import bcrypt from "bcryptjs";

let handleUserLogin = (email, password) => {
    return new Promise(async(resolve, reject) => {
        try {
            let userData = {};
            let isExist = await checkUserEmail(email);
            if (isExist) {
                let user = await User.findOne({
                    where: { email: email }
                });
                if (user) {
                    let check = await bcrypt.compare(password, user.password);
                    if(check) {
                        userData.errCode = 0;
                        userData.errMessage = 'OK';
                        userData.user = user;
                    }else {
                        userData.errCode = 3;
                        userData.errMessage = "Wrong password";
                    }
                } else {
                    userData.errCode = 2;
                    userData.errMessage = `User's not found`;
                }
            } else{
                userData.errCode = 1;
                userData.errMessage = `Your's Email isn't exist in your system. Please try again.`;
            }
            resolve(userData)
        } catch (e) {
            reject(e);
        }
    })
}

let checkUserEmail = async (email) => {
    try {
        let user = await User.findOne({
            where: { email: email },
        });
        return !!user;
    } catch (error) {
        throw new Error(error.message || 'An error occurred while checking email');
    }
};

export default { handleUserLogin, checkUserEmail};