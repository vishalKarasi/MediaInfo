import { Router } from "express";
import { verifyToken } from "../middlewares/verifyToken.js";
import {
  deleteUser,
  updateUser,
  updateFavorite,
} from "../controllers/userController.js";
import { parserImg } from "../middlewares/multer.js";

const router = Router();

router.patch(
  "/:userId",
  parserImg.single("profilePic"),
  verifyToken,
  updateUser
);
router.delete("/:userId", verifyToken, deleteUser);
router.patch("/:userId/:mediaId", verifyToken, updateFavorite);

export default router;
