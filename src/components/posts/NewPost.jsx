import { useEffect, useState } from 'react';
import './NewPost.css';
import { getAllTopics } from '../../services/topicsServices';
import { addNewPost } from '../../services/postsServices';
import { useNavigate } from 'react-router-dom';

export const NewPost = ({ currentUser }) => {
  const [topics, setTopics] = useState([]);
  const [topicInput, setTopicInput] = useState(0);
  const [titleInput, setTitleInput] = useState('');
  const [bodyInput, setBodyInput] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    getAllTopics().then((topicsArr) => setTopics(topicsArr));
  }, []);

  const getDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');

    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
  };

  const handleSave = () => {
    if (!titleInput || !bodyInput || topicInput === 0) {
      alert('Please fill out all required fields before submitting');
      return;
    }
    const newPost = {
      title: titleInput,
      body: bodyInput,
      date: getDate(),
      userId: currentUser.id,
      topicId: topicInput,
    };

    addNewPost(newPost)
      .then(() => {
        setTopicInput(0);
        setTitleInput('');
        setBodyInput('');
        navigate('/mypost');
      })
      .catch((err) => {
        console.error('Error adding new post', err);
      });
  };

  return (
    <div className="new-form-wrapper">
      <h1>New Post</h1>
      {/* Container for topic selection */}
      <div className="control-wrapper topic">
        <h2>Topic</h2>
        <select
          name="topic"
          id="topic-select"
          value={topicInput}
          required
          onChange={(e) => setTopicInput(parseInt(e.target.value))}
        >
          <option value="">--Choose Topic--</option>
          {topics.map((topic) => {
            return (
              <option value={topic.id} key={topic.id}>
                {topic.name}
              </option>
            );
          })}
        </select>
      </div>
      {/* Container for title input */}
      <div className="control-wrapper title">
        <h2>Title</h2>
        <input
          className="title-input"
          type="text"
          value={titleInput}
          required
          onChange={(e) => setTitleInput(e.target.value)}
        />
      </div>
      {/* Container for body input */}
      <div className="control-wrapper body">
        <h2>Body</h2>
        <textarea
          required
          value={bodyInput}
          onChange={(e) => setBodyInput(e.target.value)}
        ></textarea>
      </div>
      <div className="btn-wrapper">
        <button onClick={handleSave}>Save</button>
      </div>
    </div>
  );
};
