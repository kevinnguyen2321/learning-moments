import { useEffect, useState } from 'react';
import './EditProfile.css';
import { getUserByUserId, updateUserInfo } from '../../services/userService';
import { useNavigate } from 'react-router-dom';
export const EditProfile = ({ currentUser }) => {
  const navigate = useNavigate();
  const [currentUserId, setCurrentUserId] = useState(0);
  const [currentUserObj, setCurrentUserObj] = useState({
    fullName: '',
    cohort: 0,
  });

  useEffect(() => {
    setCurrentUserId(currentUser.id);
  }, [currentUser]);

  useEffect(() => {
    if (currentUserId) {
      getUserByUserId(currentUserId).then((userObj) =>
        setCurrentUserObj(userObj)
      );
    }
  }, [currentUserId]);

  const handleChangeEvent = (event) => {
    const copyOfCurrentUserObj = { ...currentUserObj };
    const property = event.target.name;

    if (property === 'cohort') {
      copyOfCurrentUserObj[property] = parseInt(event.target.value);
    } else {
      copyOfCurrentUserObj[property] = event.target.value;
    }

    setCurrentUserObj(copyOfCurrentUserObj);
  };

  const handleSave = () => {
    updateUserInfo(currentUserObj).then(() => {
      navigate('/currentuserinfo');
    });
  };

  return (
    <div className="profile-wrapper">
      <div className="name-wrapper">
        <h2>
          <span>Full Name:</span>
        </h2>
        <input
          type="text"
          name="fullName"
          value={currentUserObj.fullName}
          onChange={handleChangeEvent}
        />
      </div>

      <div className="cohort-wrapper">
        <h2>
          <span>Cohort:</span>
        </h2>
        <input
          type="number"
          name="cohort"
          value={currentUserObj.cohort}
          onChange={handleChangeEvent}
          min={1}
          max={100}
        />
      </div>

      <div className="btn-wrapper">
        <button className="save-btn" onClick={handleSave}>
          Save
        </button>
      </div>
    </div>
  );
};
