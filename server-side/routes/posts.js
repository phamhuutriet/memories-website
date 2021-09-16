import express from "express";
import { getPosts, createPost, updatePost, deletePost, likePost } from "../controllers/posts.js";

const router = express.Router(); // Where the server receive requests

router.get("/", getPosts); // If router receive 'get' requeset -> execute getPosts response
router.post("/", createPost);
router.patch("/:id", updatePost); // For thoses requests, it needs to specify the id of the object that we want to change
router.delete("/:id", deletePost);
router.patch('/:id/likePost', likePost); // We have to declare different url endpoints because '/:id' is already used for update

export default router;
