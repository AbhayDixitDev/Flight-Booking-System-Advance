// src/middlewares/auth.js
import jwt from 'jsonwebtoken';
import { User } from '../models/user.js';
import ApiError from '../utils/apiError.js';

const authMiddleware = async (req, res, next) => {
  try {
    // Retrieve token from cookies
    const token = req.cookies.accessToken;
    if (!token) {
      return next(new ApiError(401, 'Access token is missing'));
    }
    
    // Verify token using the secret key
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    
    // Find the user in the database (excluding sensitive fields)
    const user = await User.findById(decoded._id).select('-password');
    if (!user) {
      return next(new ApiError(404, 'User not found'));
    }
    
    // Attach user data to the request object
    req.user = user;
    next();
  } catch (error) {
    return next(new ApiError(401, 'Invalid or expired token', [error]));
  }
};

export default authMiddleware;
