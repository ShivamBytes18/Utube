import { Router } from "express";
import { addComment, getComments } from "../controllers/comment.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/:videoId", verifyJWT, addComment);
router.get("/:videoId", getComments);

export default router;