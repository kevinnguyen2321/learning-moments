export const getAllLikes = () => {
  return fetch('http://localhost:8088/usersLikedPosts').then((res) =>
    res.json()
  );
};

export const addLike = (postLikeObj) => {
  return fetch(' http://localhost:8088/usersLikedPosts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(postLikeObj),
  });
};

export const getAllCurrentUserLikes = (userId) => {
  return fetch(
    `http://localhost:8088/usersLikedPosts?userId=${userId}&_expand=post`
  ).then((res) => res.json());
};

export const deleteLikedPost = (likedPostId) => {
  return fetch(`http://localhost:8088/usersLikedPosts/${likedPostId}`, {
    method: 'DELETE',
  });
};
