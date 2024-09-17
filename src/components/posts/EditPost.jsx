import { useNavigate, useParams } from 'react-router-dom';
import './EditPost.css';
import { useEffect, useState } from 'react';
import { getAllTopics } from '../../services/topicsServices';
import {
  getPostOnlyByPostId,
  updateEditedPost,
} from '../../services/postsServices';

export const EditPost = () => {
  const { postId } = useParams();

  const [topics, setTopics] = useState([]);
  const [selectedPost, setSelectedPost] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    getAllTopics().then((topicsArr) => setTopics(topicsArr));

    getPostOnlyByPostId(postId).then((postObj) => setSelectedPost(postObj));
  }, []);

  const updatePostProperty = (event) => {
    const property = event.target.name;
    const selectedPostCopy = { ...selectedPost };

    if (property === 'topicId') {
      selectedPostCopy[property] = parseInt(event.target.value);
    } else {
      selectedPostCopy[property] = event.target.value;
    }
    setSelectedPost(selectedPostCopy);
  };

  const handleSave = () => {
    if (!selectedPost.body || !selectedPost.title || !selectedPost.topicId) {
      window.alert('Please fill out Title and Body sections');
    } else {
      updateEditedPost(selectedPost).then(() => {
        navigate('/mypost');
      });
    }
  };

  return (
    <div className="edit-form-wrapper">
      <div className="control-wrapper topic">
        <h1>Topic</h1>
        <select
          value={selectedPost.topicId ? selectedPost.topicId : ''}
          name="topicId"
          id="topic-select"
          onChange={updatePostProperty}
        >
          {topics.map((topic) => (
            <option value={topic.id} key={topic.id}>
              {topic.name}
            </option>
          ))}
        </select>
      </div>

      <div className="control-wrapper title">
        <h1>Title</h1>
        <input
          className="title-input"
          name="title"
          type="text"
          value={selectedPost.title ? selectedPost.title : ''}
          onChange={updatePostProperty}
        />
      </div>

      <div className="control-wrapper body">
        <h1>Body</h1>
        <textarea
          value={selectedPost.body}
          name="body"
          onChange={updatePostProperty}
        ></textarea>
      </div>

      <div className="btn-wrapper">
        <button onClick={handleSave}>Save</button>
      </div>
    </div>
  );
};
