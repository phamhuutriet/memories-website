// This is the place to create logical function that will be used in posts.js of the routes
// This will increase the readability of the code in posts.js in routes
import PostMessage from "../models/postMessage.js";
import mongoose from "mongoose";

export const getPosts = async (req, res) => {
  PostMessage.find()
    .then((users) => res.json(users))
    .catch((err) => res.json(`ERROR: ${err}`));
};

export const createPost = (req, res) => {
  const post = req.body;

  const newPost = new PostMessage(post);

  newPost
    .save()
    .then(() => console.log("Posted successfully"))
    .catch((err) => console.log(`ERROR: ${err}`));
};

export const updatePost = async (req, res) => {
  const { id } = req.params;
  const { title, message, creator, selectedFile, tags } = req.body;

  console.log("Updated post: ", req.body);

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.send("No post with that ID");

  const updatedPost = { title, message, creator, selectedFile, tags, _id: id };
  await PostMessage.findByIdAndUpdate(id, updatedPost, {
    new: true,
  });

  res.json(updatedPost);
};

export const deletePost = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.send("No post with that ID");

  await PostMessage.findByIdAndRemove(id);
  res.json({ message: "Post deleted successfully" });
};

export const likePost = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.send("No post with that ID");

  const post = await PostMessage.findById(id);
  const updatePost = await PostMessage.findByIdAndUpdate(
    id,
    { likeCount: post.likeCount + 1 },
    { new: true }
  );
};
