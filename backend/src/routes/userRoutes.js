// src/routes/userRoutes.js
import express from "express";
import { registerUser, loginUser, logoutUser, userProfile, bookFlight, loginAdmin, changePassword } from "../controllers/userController.js";
import { upload } from "../middlewares/multer.js";
import authMiddleware from "../middlewares/auth.js"; // Make sure you have this middleware

const router = express.Router();

router.post("/register", upload.single("avatar"), registerUser);
router.post("/login", loginUser);
router.post("/adminLogin", loginAdmin);
router.get("/logout", logoutUser);
router.get("/profile", authMiddleware, userProfile);
router.post("/booking", bookFlight);

// New change password route (protected)
router.post("/changePassword", authMiddleware, changePassword);

export default router;
