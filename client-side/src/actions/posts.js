import * as api from "../api";

// Action Creators -> these actions will be sent to redux reducer

export const getPosts = () => async (dispatch) => {
  try {
    const { data } = await api.fetchPosts(); // Extract the data from the api which is from the backend

    dispatch({ type: "FETCH_ALL", payload: data }); // Dispatch to redux reducer to be executed
  } catch (error) {}
};

export const createPost = (post, callBack) => async (dispatch) => {
  try {
    const { data } = await api.createPost(post); // Extract the data from the api
    callBack && callBack(); // I use getPost as callBack function to auto render after perform updating actions
    dispatch({ type: "CREATE", payload: data }); // Dispatch to redux reducer
  } catch (err) {
    console.log(err);
  }
};

export const updatePost = (id, post) => async (dispatch) => {
  try {
    const { data } = await api.updatePost(id, post);

    dispatch({ type: "UPDATE", payload: data });
  } catch (err) {
    console.log(err);
  }
};

export const deletePost = (id, callBack) => async (dispatch) => {
  try {
    await api.deletePost(id); // Cuz this is delete action, we dont need to store any data
    callBack && callBack(); // getPosts() to re-render
    dispatch({ type: "DELETE", payload: id });
  } catch (err) {
    console.log(err);
  }
};

export const likePost = (id, callBack) => async (dispatch) => {
  try {
    const { data } = await api.likePost(id);
    callBack && callBack();

    dispatch({ type: "LIKE", payload: data });
  } catch (err) {
    console.log(err);
  }
};
