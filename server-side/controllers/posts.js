// This is the place to create logical function that will be used in posts.js of the routes
// This will increase the readability of the code in posts.js in routes
import PostMessage from "../models/postMessage.js"; // Import the model to apply to each new object 
import mongoose from "mongoose";


// Response for 'get' request
export const getPosts = async (req, res) => {
  PostMessage.find() // Return all objects of DB
    .then((users) => res.json(users)) // Return them as json file -> always remember to return something, even in response like deleting sth
    .catch((err) => res.json(`ERROR: ${err}`));
};


// Response for 'post' request
export const createPost = (req, res) => {
  const post = req.body; // Create an variable to store the sending data

  const newPost = new PostMessage(post); // Apply schema model to each new object

  newPost
    .save()
    .then(() => console.log("Posted successfully"))
    .catch((err) => console.log(`ERROR: ${err}`));
  
  res.json(newPost); // Always remember to return something or the api won't be executed
};


// Response for 'patch' (update) request
export const updatePost = async (req, res) => {
  const { id } = req.params; // Update, delete, etc... needs the specific id of an object
  const { title, message, creator, selectedFile, tags } = req.body; // Deconstruct the data

  console.log("Updated post: ", req.body);

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.send("No post with that ID"); // Signal the error if can't find the object 

  const updatedPost = { title, message, creator, selectedFile, tags, _id: id };
  await PostMessage.findByIdAndUpdate(id, updatedPost, {
    new: true,
  }); // Find the object with that id and update it

  res.json(updatedPost); // Always return sth
};


// Response for 'delete' request
export const deletePost = async (req, res) => {
  const { id } = req.params; // Extract the id from the url

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.send("No post with that ID");

  await PostMessage.findByIdAndRemove(id); // Find the object with that id and delete it
  res.json({ message: "Post deleted successfully" }); // Always return sth
}; 

// Response for 'patch' request -> because each like will update the likeCount prop of an object
export const likePost = async (req, res) => {
  const { id } = req.params; // Extract the id from the url

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.send("No post with that ID");

  const post = await PostMessage.findById(id); // Find the object with that id
  const updatePost = await PostMessage.findByIdAndUpdate(
    id,
    { likeCount: post.likeCount + 1 },
    { new: true }
  ); // Update the likeCount prop of that object
  res.json({likeCount: updatePost.likeCount}); // Always return sth
};
