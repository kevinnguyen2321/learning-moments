import { Link, useLocation } from 'react-router-dom';

export const PostPreview = ({
  post,
  handleDelete,
  likedPost,
  handleRemove,
}) => {
  const location = useLocation();

  return (
    <div className="my-post">
      {/* If location is /mypost then render link to /post/postId and delete btn */}
      {location.pathname === '/mypost' && (
        <>
          <Link to={`/post/${post.id}`}>Title: {post.title}</Link>

          <button
            className="delete-btn"
            onClick={() => {
              handleDelete(post.id);
            }}
          >
            Delete
          </button>
        </>
      )}
      {/* If location is /favorites then link to /favorites and redner remove btn */}
      {location.pathname === '/favorites' && (
        <>
          <Link to={`/post/${likedPost.post.id}`}>
            Title: {likedPost.post.title}
          </Link>
          <button
            className="delete-btn"
            onClick={() => {
              handleRemove(likedPost.id);
            }}
          >
            Remove
          </button>
        </>
      )}
    </div>
  );
};
