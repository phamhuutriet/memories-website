// This is the place to create logical function that will be used in posts.js of the routes
// This will increase the readability of the code in posts.js in routes
import PostMessage from "../models/postMessage.js";

export const getPosts = async (req, res) => {
  PostMessage.find()
    .then((users) => res.json(users))
    .catch((err) => res.json(`ERROR: ${err}`));
};

export const createPost = (req, res) => {
  const post = req.body;

  const newPost = new PostMessage( post );

  newPost
    .save()
    .then(() => console.log("Posted successfully"))
    .catch((err) => console.log(`ERROR: ${err}`));
};
