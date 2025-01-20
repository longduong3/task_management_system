import jwt from 'jsonwebtoken';
import { User } from '../models';

const checkAuthentication = async (req, res, next) => {
    try {
        const authHeader = req.header('Authorization');
        if (!authHeader) {
            return res.status(401).json({
                message: 'Access Denied. No token provided.'
            });
        }
        if (!authHeader.startsWith('Bearer ')) {
            return res.status(401).json({
                message: 'Invalid token format. Use Bearer format.'
            });
        }
        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findByPk(decoded.id);
        if (!user) {
            return res.status(401).json({
                message: 'User no longer exists.'
            });
        }

        req.user = {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role
        };

        next();
    } catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            return res.status(401).json({
                message: 'Token has expired.'
            });
        }

        if (error instanceof jwt.JsonWebTokenError) {
            return res.status(401).json({
                message: 'Invalid token.'
            });
        }

        console.error('Authentication error:', error);
        return res.status(500).json({
            message: 'Internal server error during authentication.',
            error: error.message
        });
    }
};

export default checkAuthentication;