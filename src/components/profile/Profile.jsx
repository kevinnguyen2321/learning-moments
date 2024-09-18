import { useLocation, useNavigate, useParams } from 'react-router-dom';
import './Profile.css';
import { useEffect, useState } from 'react';
import { getCurrentUserProfileInfo } from '../../services/userService';
import { getPostOnlyByPostId } from '../../services/postsServices';

export const Profile = ({ currentUser }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { postId } = useParams();
  //State//
  const [currentUserInfo, setCurrentUserInfo] = useState({});
  const [post, setPost] = useState({});
  const [postAuthor, setPostAuthor] = useState({});
  //Use effects//
  useEffect(() => {
    if (postId) {
      getPostOnlyByPostId(postId).then((postObj) => {
        setPost(postObj);
      });
    }
  }, []);

  useEffect(() => {
    getCurrentUserProfileInfo(post.userId).then((data) => {
      const postAuthorObj = data[0];
      setPostAuthor(postAuthorObj);
    });
  }, [post]);

  useEffect(() => {
    getCurrentUserProfileInfo(currentUser.id).then((data) => {
      const currentUserInfoObject = data[0];
      setCurrentUserInfo(currentUserInfoObject);
    });
  }, [currentUser]);

  //Handle function//
  const handleEdit = () => {
    navigate('/editprofile');
  };

  return (
    <div className="profile-wrapper">
      <div>
        <h2>
          <span>Full Name:</span>
          {/* If location is in /currentuserprofile render current user info */}
          {location.pathname === '/currentuserinfo' &&
            currentUserInfo?.fullName}

          {/* If location is /post/postId/postauthor render postAuthor info */}
          {location.pathname === `/post/${postId}/postauthor` &&
            postAuthor?.fullName}
        </h2>
      </div>
      <div>
        <h2>
          <span>Cohort:</span>{' '}
          {/* If location is in /currentuserprofile render current user info */}
          {location.pathname === '/currentuserinfo' && currentUserInfo?.cohort}
          {/* If location is /post/postId/postauthor render postAuthor info */}
          {location.pathname === `/post/${postId}/postauthor` &&
            postAuthor?.cohort}
        </h2>
      </div>
      <div>
        <h2>
          <span>Number of posts written:</span>{' '}
          {/* If location is in /currentuserprofile render current user info */}
          {location.pathname === '/currentuserinfo' &&
            currentUserInfo?.posts?.length}
          {/* If location is /post/postId/postauthor render postAuthor info */}
          {location.pathname === `/post/${postId}/postauthor` &&
            postAuthor?.posts?.length}
        </h2>
      </div>
      {/* If location is in /currentuserprofile render edit button */}
      {(location.pathname === '/currentuserinfo' ||
        currentUser.id === postAuthor?.id) && (
        <div className="edit-btn-wrapper">
          <button className="edit-btn" onClick={handleEdit}>
            Edit
          </button>
        </div>
      )}
    </div>
  );
};
