import express from "express";
import { checkAuth, forgotPassword, login, logout, resetPassword, signup, updateProfile, verifyEmail } from "../controller/user.controller";
import { isAuthenticated } from "../middlewares/isAuthenticated";


const router = express.Router()


router.post('/signup', signup)

router.post('.login', login)

router.get('/logout', isAuthenticated, logout)

router.post('/verify-email', verifyEmail)

router.post('/forgot-password', forgotPassword)

router.post('/reset-password/:token', resetPassword)

router.put('/profile/update', isAuthenticated, updateProfile)

router.get('/get-me', isAuthenticated, checkAuth)

router.get('/check-auth', isAuthenticated, checkAuth)


export default router


