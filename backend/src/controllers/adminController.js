// src/controllers/adminController.js
import  asyncHandler  from '../utils/asyncHandler.js';
import  ApiResponse  from '../utils/apiResponse.js';
import  ApiError  from '../utils/apiError.js';
import Airline from '../models/airline.js';
import City from '../models/city.js';
import { Flight } from '../models/flight.js';
import { User } from '../models/user.js'; // Ensure User model is imported for admin operations

export const registerAirline = asyncHandler(async (req, res, next) => {
  try {
    const airline = await Airline.create({
      name: req.body.name,
      code: req.body.code,
    });
    return res
      .status(201)
      .json(new ApiResponse(201, airline, 'Airline registered successfully'));
  } catch (error) {
    return next(new ApiError(400, error.message, [error]));
  }
});

export const registerCity = asyncHandler(async (req, res, next) => {
  try {
    const city = await City.create({
      name: req.body.name,
      country: req.body.country,
      code: req.body.code,
    });
    return res
      .status(201)
      .json(new ApiResponse(201, city, 'City registered successfully'));
  } catch (error) {
    return next(new ApiError(400, error.message, [error]));
  }
});

export const registerFlight = asyncHandler(async (req, res, next) => {
  try {
    const {
      airline,
      flightNumber,
      departureCity,
      arrivalCity,
      departureTime,
      arrivalTime,
      duration,
      economyPrice,
      businessPrice,
      economySeats,
      businessSeats,
    } = req.body;

    const flight = await Flight.create({
      airline,
      flightNumber,
      departureCity,
      arrivalCity,
      departureTime,
      arrivalTime,
      duration,
      economyPrice,
      businessPrice,
      economySeats,
      businessSeats,
    });
    return res
      .status(201)
      .json(new ApiResponse(201, flight, 'Flight registered successfully'));
  } catch (error) {
    return next(new ApiError(400, error.message, [error]));
  }
});

export const changeAdminPassword = asyncHandler(async (req, res, next) => {
  const { email, currentPassword, newPassword } = req.body;
  
  // Validate inputs
  if (!email || !currentPassword || !newPassword) {
    return next(new ApiError(400, 'Email, current password, and new password are required'));
  }
  
  // Find the admin user by email
  const user = await User.findOne({ email });
  if (!user) {
    return next(new ApiError(400, 'User not found'));
  }
  
  // Ensure the user is an admin
  if (!user.isAdmin) {
    return next(new ApiError(403, 'Access denied: Not an admin account'));
  }
  
  // Check if the current password is correct
  const isMatch = await user.isPasswordCorrect(currentPassword);
  if (!isMatch) {
    return next(new ApiError(400, 'Current password is incorrect'));
  }
  
  // Update the user's password
  user.password = newPassword;
  await user.save();
  
  return res.status(200).json(new ApiResponse(200, null, 'Admin password changed successfully'));
});
