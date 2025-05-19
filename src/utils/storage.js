export const getUsers = () => {
  try {
    return JSON.parse(localStorage.getItem("users")) || {};
  } catch {
    return {};
  }
};

export const getProfiles = () => {
  try {
    return JSON.parse(localStorage.getItem("profiles")) || {};
  } catch {
    return {};
  }
};

// utils/storage.js
export const savePost = (role, username, produce) => {
  const key = `posts-${role}-${username}`;
  const posts = JSON.parse(localStorage.getItem(key)) || [];
  posts.push(produce);
  localStorage.setItem(key, JSON.stringify(posts));
};

export const loadPosts = (role, username) => {
  const key = `posts-${role}-${username}`;
  return JSON.parse(localStorage.getItem(key)) || [];
};
