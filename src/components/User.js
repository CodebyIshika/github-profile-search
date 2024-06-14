import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const User = () => {
  const { username } = useParams();
  const [user, setUser] = useState(null);
  const [repos, setRepos] = useState([]);
  const token = process.env.REACT_APP_GITHUB_TOKEN;
  const options = { headers: { Authorization: `Bearer ${token}` } };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userResponse = await axios.get(`https://api.github.com/users/${username}`, options);
        setUser(userResponse.data);
        const reposResponse = await axios.get(`https://api.github.com/users/${username}/repos`, options);
        setRepos(reposResponse.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [username]);

  if (!user) {
    return <div className='spinner'></div>;
  }

  const handleGoToGitHub = () => {
    window.open(user.html_url, '_blank');
  };

  return (
    <div className="user-container">
      <div className="user-info">
        <img src={user.avatar_url} alt={`${user.name}'s avatar`} className="avatar" />
        <h1>{user.name}</h1>
        <div className="user-stats">
          <div className="stat">
            <p className="stat-number">{user.public_repos}</p>
            <p className="stat-label">Repositories</p>
          </div>
          <div className="stat">
            <p className="stat-number">{user.followers}</p>
            <p className="stat-label">Followers</p>
          </div>
          <div className="stat">
            <p className="stat-number">{user.following}</p>
            <p className="stat-label">Following</p>
          </div>
        </div>
        <button onClick={handleGoToGitHub} className="github-button">Go to GitHub</button>
      </div>
      <div className="user-repos">
        <h2>My repositories</h2>
        <ul>
          {repos.map((repo) => (
            <li key={repo.id} className="repo-item">
              <div className="repo-header">
                <a href={repo.html_url} target="_blank" rel="noopener noreferrer">{repo.name}</a>
                <span className="repo-updated">Updated at {new Date(repo.updated_at).toLocaleDateString()}</span>
              </div>
              {repo.description && <p className="repo-description">{repo.description}</p>}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default User;
