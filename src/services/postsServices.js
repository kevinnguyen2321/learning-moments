export const getAllPosts = () => {
  return fetch('http://localhost:8088/posts?_expand=topic').then((res) =>
    res.json()
  );
};
//Fetch call that uses expand and embed//
export const getPostById = (postId) => {
  return fetch(
    `http://localhost:8088/posts/${postId}?_expand=user&_expand=topic&_embed=usersLikedPosts`
  ).then((res) => res.json());
};

//Fetch call that get post only without expand and embed//
export const getPostOnlyByPostId = (postId) => {
  return fetch(`http://localhost:8088/posts/${postId}`).then((res) =>
    res.json()
  );
};

export const addNewPost = (newPostObj) => {
  return fetch(' http://localhost:8088/posts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newPostObj),
  });
};
// Getting post by userId//
export const getPostOnlyByUserId = (userId) => {
  return fetch(`http://localhost:8088/posts?userId=${userId}`).then((res) =>
    res.json()
  );
};

export const deletePost = (postId) => {
  return fetch(` http://localhost:8088/posts/${postId}`, {
    method: 'DELETE',
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error('Failed to delete post');
      }
      return res.json();
    })
    .then(() => console.log('Successfully deleted post'))
    .catch((error) => console.error('Error:', error));
};

export const updateEditedPost = (post) => {
  return fetch(`  http://localhost:8088/posts/${post.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(post),
  });
};
