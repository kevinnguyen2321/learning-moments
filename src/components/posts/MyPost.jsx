import { useEffect, useState } from 'react';
import './MyPost.css';
import { deletePost, getPostOnlyByUserId } from '../../services/postsServices';
import { Link } from 'react-router-dom';
import { PostPreview } from './PostPreview';

export const MyPost = ({ currentUser }) => {
  const [myPost, setMyPost] = useState([]);

  const getAndSetMyPosts = () => {
    getPostOnlyByUserId(currentUser.id).then((myPostArr) =>
      setMyPost(myPostArr)
    );
  };

  useEffect(() => {
    getAndSetMyPosts();
  }, [currentUser]);

  const handleDelete = (postId) => {
    deletePost(postId)
      .then(() => {
        getAndSetMyPosts();
      })
      .catch((error) => {
        console.error('Error deleting post:', error);
      });
  };

  return (
    <div className="mypost-wrapper">
      {myPost.map((post) => {
        return (
          <PostPreview post={post} handleDelete={handleDelete} key={post.id} />
        );
      })}
    </div>
  );
};
