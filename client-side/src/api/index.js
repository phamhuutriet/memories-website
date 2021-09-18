import axios from "axios";

const url = "https://afternoon-plains-17878.herokuapp.com/posts";

// This is where we connect the front end to the back end
export const fetchPosts = () => axios.get(url); // send the 'get' request to the endpoint
export const createPost = (newPost) => axios.post(url, newPost); // send the 'post' request to the endpoint 
export const updatePost = (id, updatedPost) => axios.patch(`${url}/${id}`, updatedPost); // Modify the endpoint with id
export const deletePost = (id) => axios.delete(`${url}/${id}`); // the same as update
export const likePost = (id) => axios.patch(`${url}/${id}/likePost`); // the same as update
