import userService from '../services/userService';


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

export default { handleLogin};