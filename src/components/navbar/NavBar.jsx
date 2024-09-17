import './NavBar.css';
import { Link, useNavigate } from 'react-router-dom';

export const NavBar = () => {
  const navigate = useNavigate();
  return (
    <ul className="navbar-wrapper">
      <li className="navbar-item">
        <Link to="/">All Posts</Link>
      </li>

      <li className="navbar-item">
        <Link to={'/mypost'}>My Posts</Link>
      </li>

      <li className="navbar-item">
        <Link to={'/favorites'}>Favorites</Link>
      </li>

      <li className="navbar-item">
        <Link to="/newpost">New Post</Link>
      </li>

      <li className="navbar-item">
        <Link to="/currentuserinfo">Profile</Link>
      </li>

      {localStorage.getItem('learning_user') ? (
        <li className="navbar-item">
          <Link
            to=""
            onClick={() => {
              localStorage.removeItem('learning_user');
              navigate('/login', { replace: true });
            }}
          >
            Logout
          </Link>
        </li>
      ) : (
        ''
      )}
    </ul>
  );
};
