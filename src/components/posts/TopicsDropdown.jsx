import { useState, useEffect } from 'react';
import { getAllTopics } from '../../services/topicsServices';
import './TopicsDropdown.css';
export const TopicsDropdown = ({ setSelectedTopic }) => {
  const [topics, setTopics] = useState([]);
  useEffect(() => {
    getAllTopics().then((topicsArr) => setTopics(topicsArr));
  }, []);

  const handleChange = (changeEvent) => {
    const topicId = changeEvent.target.value;
    setSelectedTopic(topicId);
  };

  return (
    <select
      name="topics"
      id="topic-select"
      className="topics-dropdown"
      onChange={handleChange}
    >
      <option value="">--All Topics--</option>
      {topics.map((topic) => {
        return (
          <option value={topic.id} key={topic.id}>
            {topic.name}
          </option>
        );
      })}
    </select>
  );
};
