import { errorHandler } from "./error.js";
export const verifyToken = (req, res, next) => {    
    const token = req.cookies.access_token;
    if (!token) {
        return next(errorHandler(401, 'You are not authenticated'));
    }
    try {
        const decoded = jwt.verify(token, process.env.SECRET, (err, user) => {
            if (err) {
                return next(errorHandler(403, 'Token is not valid'));
            }
            req.user = user;
            next();
        })
    }
    catch (error) {
        return next(errorHandler(500, error.message));
    }
}