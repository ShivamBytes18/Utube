import { Comment } from "../models/comment.model.js";
import { asynchandler } from "../utils/asynchandler.js";
import { ApiError } from "../utils/ApiError.js";

// ➕ Add comment OR reply
export const addComment = asynchandler(async (req, res) => {
  const { videoId } = req.params;
  const { content, parentComment } = req.body;

  if (!content) {
    throw new ApiError(400, "Comment is required");
  }

  const comment = await Comment.create({
    content,
    video: videoId,
    owner: req.user._id,
    parentComment: parentComment || null
  });

  const populated = await comment.populate("owner", "username avatar");

  return res.status(200).json({
    success: true,
    data: populated
  });
});

// 📥 Get comments with replies
export const getComments = asynchandler(async (req, res) => {
  const { videoId } = req.params;

  const comments = await Comment.find({
    video: videoId,
    parentComment: null
  })
    .populate("owner", "username avatar")
    .sort({ createdAt: -1 })
    .lean();

  const replies = await Comment.find({
    video: videoId,
    parentComment: { $ne: null }
  })
    .populate("owner", "username avatar")
    .lean();

  const map = {};

  comments.forEach((c) => {
    map[c._id] = { ...c, replies: [] };
  });

  replies.forEach((r) => {
    if (map[r.parentComment]) {
      map[r.parentComment].replies.push(r);
    }
  });

  return res.status(200).json({
    success: true,
    data: Object.values(map)
  });
});