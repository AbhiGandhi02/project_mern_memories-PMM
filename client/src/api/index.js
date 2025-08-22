import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000' });

// This interceptor will run before every request.
API.interceptors.request.use((req) => {
  const profile = localStorage.getItem('profile');

  if (profile) {
    // If a user is logged in, get their token
    const token = JSON.parse(profile).token;
    
    // Add the token to the 'Authorization' header
    req.headers.Authorization = `Bearer ${token}`;
    // console.log('Interceptor adding token:', token);
  }
  else{
    // console.log('Interceptor: No profile found in localStorage');
  }

  // Return the modified request so it can be sent
  return req;
});

// --- Your API calls remain the same ---
export const fetchPosts = () => API.get('/posts');
export const createPost = (newPost) => API.post('/posts', newPost);
export const likePost = (id) => API.patch(`/posts/${id}/likePost`);
export const updatePost = (id, updatedPost) => API.patch(`/posts/${id}`, updatedPost);
export const deletePost = (id) => API.delete(`/posts/${id}`);
export const getPost = (id) => API.get(`/posts/${id}`);
export const comment = (text, id) => API.post(`/posts/${id}/commentPost`, { text });
export const deleteComment = (id, commentId) => API.delete(`/posts/${id}/deleteComment/${commentId}`);

// --- Your auth calls remain the same ---
export const signIn = (idToken, payload) => API.post('/auth/login', payload, {
  headers: { Authorization: `Bearer ${idToken}` }
});