import express from "express";
import { isAuthenticated } from "../middlewares/isAuthenticated";
import upload from "../middlewares/multer";
import { addMenu, deleteMenu, updateMenu } from "../controller/menu.controller";



const router = express.Router();

router.route("/").post(isAuthenticated, upload.single('image'), addMenu);
router.route("/:id").put(isAuthenticated, upload.single('image'), updateMenu);
router.route("/:id").delete(isAuthenticated, deleteMenu);

export default router;







