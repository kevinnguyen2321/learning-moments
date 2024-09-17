import { useLocation, useParams } from 'react-router-dom';
import './Profile.css';
import { useEffect, useState } from 'react';
import { getCurrentUserProfileInfo } from '../../services/userService';

export const Profile = ({ currentUser }) => {
  const location = useLocation();
  const { postId } = useParams();
  const [currentUserInfo, setCurrentUserInfo] = useState({});
  console.log(postId);

  useEffect(() => {
    getCurrentUserProfileInfo(currentUser.id).then((data) => {
      const currentUserInfoObject = data[0];
      setCurrentUserInfo(currentUserInfoObject);
    });
  }, [currentUser]);

  return (
    <div className="profile-wrapper">
      <div>
        <h2>
          <span>Full Name:</span>
          {/* If location is in /currentuserprofile render current user info */}
          {location.pathname === '/currentuserinfo' &&
            currentUserInfo?.fullName}
        </h2>
      </div>
      <div>
        <h2>
          <span>Cohort:</span>{' '}
          {/* If location is in /currentuserprofile render current user info */}
          {location.pathname === '/currentuserinfo' && currentUserInfo?.cohort}
        </h2>
      </div>
      <div>
        <h2>
          <span>Number of posts written:</span>{' '}
          {/* If location is in /currentuserprofile render current user info */}
          {location.pathname === '/currentuserinfo' &&
            currentUserInfo?.posts?.length}
        </h2>
      </div>
      {/* If location is in /currentuserprofile render edit button */}
      {location.pathname === '/currentuserinfo' && (
        <div className="edit-btn-wrapper">
          <button className="edit-btn">Edit</button>
        </div>
      )}
    </div>
  );
};
