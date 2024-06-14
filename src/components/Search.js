// Example in Search.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Search = () => {
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Accessing the environment variable
  const token = 'token';

  const handleInputChange = (e) => {
    setUsername(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (username.trim() === '') {
      setError('Username is required');
      return;
    }

    try {
      const options = { headers: { Authorization: `Bearer ${token}` } };
      const response = await axios.get(`https://api.github.com/users/${username}`, options);

      if (response.status === 200) {
        navigate(`/user/${username}`);
      }
    } catch (err) {
      setError('No user found');
    }
  };

  return (
    <div className="search-container">
      <img 
          src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png" 
          alt="GitHub Icon" 
          className="github-icon" 
      />
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <input
            type="text"
            placeholder="Enter GitHub username"
            value={username}
            onChange={handleInputChange}
          />
          <button type="submit">Search</button>
        </div>
      </form>
      {error && <p>{error}</p>}
      {!error && <p>Welcome to GitHub Finder</p>}
    </div>
  );
};

export default Search;
