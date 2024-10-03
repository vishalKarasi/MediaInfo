import { Router } from "express";
import { register, login, logout } from "../controllers/authController.js";
import { parserImg } from "../middlewares/multer.js";

const router = Router();

router.post("/register", parserImg.single("profilePic"), register);
router.post("/login", parserImg.none(), login);
router.post("/logout", logout);

export default router;
