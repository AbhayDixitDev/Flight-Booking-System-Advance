// src/controllers/userController.js
import asyncHandler from '../utils/asyncHandler.js';
import ApiResponse from '../utils/apiResponse.js';
import ApiError from '../utils/apiError.js';
import { User } from '../models/user.js';
import { Booking } from '../models/booking.js';
import { Flight } from '../models/flight.js';
import { uploadOnCloudinary } from '../utils/cloudinary.js';

export const registerUser = asyncHandler(async (req, res, next) => {
  try {
    // Check if file exists
    if (!req.file) {
      return next(new ApiError(400, 'Avatar file is missing'));
    }
    
    let { username, email, password, fullName, passportNumber } = req.body;
    
    // Upload avatar image to Cloudinary using multer file
    let avatarResponse = await uploadOnCloudinary(req.file.path);
    if (!avatarResponse) return next(new ApiError(400, 'Avatar is required'));

    const avatar = avatarResponse.secure_url;

    // Check for an existing user by email
    const existingUser = await User.findOne({ email });
    if (existingUser) return next(new ApiError(400, 'User already exists'));

    const user = await User.create({
      username,
      email,
      password,
      fullName,
      avatar,
      passportNumber,
    });

    return res
      .status(201)
      .json(new ApiResponse(201, user, 'User registered successfully'));
  } catch (error) {
    return next(new ApiError(400, error.message, [error]));
  }
});


export const loginUser = asyncHandler(async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return next(new ApiError(400, 'User not found'));

    const isPasswordCorrect = await user.isPasswordCorrect(password);
    if (!isPasswordCorrect)
      return next(new ApiError(400, 'Incorrect password'));

    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    // Set cookies with tokens
    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
    });
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
    });

    return res
      .status(200)
      .json(new ApiResponse(200, user, 'User logged in successfully'));
  } catch (error) {
    return next(new ApiError(400, error.message, [error]));
  }
});

export const loginAdmin = asyncHandler(async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return next(new ApiError(400, 'Incorrect email or password'));

    const isPasswordCorrect = await user.isPasswordCorrect(password);
    if (!isPasswordCorrect)
      return next(new ApiError(400, 'Incorrect email or password'));

    if (!user.isAdmin)
      return next(new ApiError(400, 'Please login with an admin account'));

    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
    });
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
    });

    return res
      .status(200)
      .json(new ApiResponse(200, user, 'User logged in successfully'));
  } catch (error) {
    return next(new ApiError(400, error.message, [error]));
  }
});

export const logoutUser = asyncHandler(async (req, res, next) => {
  try {
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');
    return res
      .status(200)
      .json(new ApiResponse(200, null, 'User logged out successfully'));
  } catch (error) {
    return next(new ApiError(400, error.message, [error]));
  }
});

// src/controllers/userController.js
export const userProfile = asyncHandler(async (req, res, next) => {
  // req.user should be populated by the auth middleware
  if (!req.user) {
    return next(new ApiError(400, 'User not found'));
  }
  return res.status(200).json(new ApiResponse(200, req.user, 'User profile fetched successfully'));
});


export const bookFlight = asyncHandler(async (req, res, next) => {
  try {
    const { flightDetails, bookingDate, passengers, userId } = req.body;
    const flight = await Flight.findById(flightDetails);
    if (!flight) return next(new ApiError(400, 'Flight not found'));

    // Calculate total cost based on economy price and number of passengers.
    const totalCost = flight.economyPrice * passengers.length;

    const booking = await Booking.create({
      flightDetails,
      userId,
      bookingDate,
      passengers,
      totalCost,
    });

    return res
      .status(201)
      .json(new ApiResponse(201, booking, 'Flight booked successfully'));
  } catch (error) {
    return next(new ApiError(400, error.message, [error]));
  }
});

export const changePassword = asyncHandler(async (req, res, next) => {
  // req.user is expected to be set by the authentication middleware
  const user = req.user;
  if (!user) {
    return next(new ApiError(401, 'User not authenticated'));
  }
  
  const { currentPassword, newPassword } = req.body;
  
  if (!currentPassword || !newPassword) {
    return next(new ApiError(400, 'Current and new passwords are required'));
  }
  
  // Verify that the current password is correct
  const isMatch = await user.isPasswordCorrect(currentPassword);
  if (!isMatch) {
    return next(new ApiError(400, 'Current password is incorrect'));
  }
  
  // Update password. The pre-save hook on the User model will hash the new password.
  user.password = newPassword;
  await user.save();
  
  return res.status(200).json(new ApiResponse(200, null, 'Password changed successfully'));
});
