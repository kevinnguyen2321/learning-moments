import { Outlet, Route, Routes } from 'react-router-dom';
import { AllPosts } from '../components/posts/AllPosts';
import { NavBar } from '../components/navbar/NavBar';
import { useEffect, useState } from 'react';
import { PostDetails } from '../components/posts/PostDetails';
import { NewPost } from '../components/posts/NewPost';
import { MyPost } from '../components/posts/MyPost';
import { EditPost } from '../components/posts/EditPost';
import { Favorites } from '../components/favorites/Favorites';
import { Profile } from '../components/profile/Profile';
import { EditProfile } from '../components/profile/EditProfile';

export const ApplicationViews = () => {
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    const localLearningUser = localStorage.getItem('learning_user');
    const learningUserObject = JSON.parse(localLearningUser);
    setCurrentUser(learningUserObject);
  }, []);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <NavBar />
            <Outlet />
          </>
        }
      >
        <Route index element={<AllPosts />} />
        <Route path="post/:postId">
          <Route index element={<PostDetails currentUser={currentUser} />} />
          <Route path="edit" element={<EditPost />} />
          <Route
            path="postauthor"
            element={<Profile currentUser={currentUser} />}
          />
        </Route>
        <Route path="newpost" element={<NewPost currentUser={currentUser} />} />
        <Route path="mypost" element={<MyPost currentUser={currentUser} />} />
        <Route
          path="favorites"
          element={<Favorites currentUser={currentUser} />}
        />
        <Route
          path="currentuserinfo"
          element={<Profile currentUser={currentUser} />}
        />
        <Route
          path="editprofile"
          element={<EditProfile currentUser={currentUser} />}
        />
      </Route>
    </Routes>
  );
};
