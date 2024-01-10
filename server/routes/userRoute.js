import { Router } from "express";
import { verifyToken } from "../middlewares/verifyToken.js";
import {
  deleteUser,
  getUser,
  updateUser,
  updateWatchlist,
} from "../controllers/userController.js";
import { parserImg } from "../middlewares/multer.js";

const router = Router();

router.get("/:userId", verifyToken, getUser);
router.patch(
  "/:userId",
  parserImg.single("profilePic"),
  verifyToken,
  updateUser
);
router.delete("/:userId", verifyToken, deleteUser);
router.patch("/:userId/:mediaId", verifyToken, updateWatchlist);

export default router;
