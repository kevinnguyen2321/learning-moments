import { useEffect, useState } from 'react';
import { PostPreview } from '../posts/PostPreview';
import {
  deleteLikedPost,
  getAllCurrentUserLikes,
} from '../../services/likesServices';

export const Favorites = ({ currentUser }) => {
  const [currentUserLikedPosts, setCurrentUserLikedPosts] = useState([]);

  const getAndSetCurrentUserLikes = () => {
    getAllCurrentUserLikes(currentUser.id).then((currentUserLikesArr) => {
      setCurrentUserLikedPosts(currentUserLikesArr);
    });
  };

  useEffect(() => {
    getAndSetCurrentUserLikes();
  }, [currentUser]);

  const handleRemove = (likedPostId) => {
    deleteLikedPost(likedPostId).then(() => {
      getAndSetCurrentUserLikes();
    });
  };

  return (
    <div className="mypost-wrapper">
      {currentUserLikedPosts.map((likedPost) => (
        <PostPreview
          likedPost={likedPost}
          handleRemove={handleRemove}
          key={likedPost.id}
        />
      ))}
    </div>
  );
};
