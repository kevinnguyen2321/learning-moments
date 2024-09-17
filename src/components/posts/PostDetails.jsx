import { useEffect, useState } from 'react';
import { getPostById } from '../../services/postsServices';
import { Link, useNavigate, useParams } from 'react-router-dom';
import './PostDetails.css';
import { addLike } from '../../services/likesServices';

// TODO Add navigation to favorites view when user likes a post//
//TODO Once user clicks Edit button then navigate to Edit Post view//

export const PostDetails = ({ currentUser }) => {
  //Params//
  const { postId } = useParams();
  //States//
  const [post, setPost] = useState({});
  const [liked, setLiked] = useState(false);
  //Navigate//
  const navigate = useNavigate();
  //Service functions//
  const getAndSetPostInfo = () => {
    getPostById(postId).then((postObj) => setPost(postObj));
  };
  //UseEffects//
  useEffect(() => {
    getAndSetPostInfo();
  }, []);

  useEffect(() => {
    const likedPostsArr = post.usersLikedPosts;

    const postLikedByCurrentUser = likedPostsArr?.find(
      (post) => post.userId === currentUser.id
    );

    postLikedByCurrentUser ? setLiked(true) : setLiked(false);

    getAndSetPostInfo();
  }, [post]);
  // Event handler functions//
  const handleLike = () => {
    const newPostLikedObj = {
      userId: currentUser.id,
      postId: post.id,
    };

    addLike(newPostLikedObj).then(() => {
      setLiked(true);
      navigate('/favorites');
    });
  };

  const handleEdit = () => {
    navigate(`/post/${postId}/edit`);
  };

  return (
    <div className="post-details">
      <h2>
        <span>Title:</span>
        {post.title}
      </h2>
      <h2>
        <Link className="author-link" to={`/post/${post.id}/postauthor`}>
          <span>Author:</span> {post.user?.fullName}
        </Link>
      </h2>
      <h2>
        <span>Topic: </span>
        {post.topic?.name}
      </h2>
      <h2>
        <span>Date:</span> {post.date}
      </h2>
      <h2>
        <span>Body:</span> {post.body}
      </h2>
      <h2>
        <span>Likes:</span> {post.usersLikedPosts?.length}
      </h2>
      {currentUser.id === post.userId ? (
        <div className="btn-wrapper">
          <button className="edit-btn" onClick={handleEdit}>
            Edit
          </button>
        </div>
      ) : (
        <div className="btn-wrapper">
          <button
            className={`like-btn ${liked ? 'liked' : ''}`}
            onClick={handleLike}
            disabled={liked}
          >
            {liked ? 'Liked' : 'Like'}
          </button>
        </div>
      )}
    </div>
  );
};
