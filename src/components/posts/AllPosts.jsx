import { useEffect } from 'react';
import { useState } from 'react';
import './AllPosts.css';
import { getAllLikes } from '../../services/likesServices';
import { getAllPosts } from '../../services/postsServices';
import { TopicsDropdown } from './TopicsDropdown';
import { SearchPost } from './SearchPost';
import { Link } from 'react-router-dom';

export const AllPosts = () => {
  const [posts, setPosts] = useState([]);
  const [likes, setLikes] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState(0);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  useEffect(() => {
    getAllPosts().then((postsArr) => setPosts(postsArr));
  }, []);

  useEffect(() => {
    getAllLikes().then((likesArr) => setLikes(likesArr));
  }, []);

  useEffect(() => {
    const topicId = parseInt(selectedTopic);
    const filteredTopics = posts.filter((post) => post.topicId === topicId);
    // Conditional to check if selected state is initial value and render based on selection//
    selectedTopic === 0 || selectedTopic === ''
      ? setFilteredPosts(posts)
      : setFilteredPosts(filteredTopics);
  }, [selectedTopic, posts]);

  useEffect(() => {
    const filteredPostTitle = posts.filter((post) =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredPosts(filteredPostTitle);
  }, [searchTerm, posts]);

  //Function to display like count//
  const displayLikeCount = (id, likesArr) => {
    const likeCount = likesArr.filter((likes) => likes.postId === id);
    return likeCount.length;
  };

  return (
    <>
      <div className="filter-wrapper">
        <TopicsDropdown setSelectedTopic={setSelectedTopic} />
        <SearchPost setSearchTerm={setSearchTerm} />
      </div>
      <div className="posts-wrapper">
        {filteredPosts.map((post) => {
          return (
            <Link to={`/post/${post.id}`} key={post.id}>
              <div className="post">
                <h2>
                  <span>Title:</span>
                  {post.title}
                </h2>
                <h2>
                  <span>Topic:</span>
                  {post.topic.name}
                </h2>
                <h2>
                  <span>Likes:</span>
                  {displayLikeCount(post.id, likes)}
                </h2>
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );
};
