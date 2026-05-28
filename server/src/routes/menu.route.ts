import express from "express";
import { isAuthenticated } from "../middlewares/isAuthenticated";
import upload from "../middlewares/multer";
import { addMenu, updateMenu } from "../controller/menu.controller";



const router = express.Router();

router.route("/").post(isAuthenticated, upload.single('image'), addMenu);
router.route("/").put(isAuthenticated, upload.single('image'), updateMenu);

export default router;







