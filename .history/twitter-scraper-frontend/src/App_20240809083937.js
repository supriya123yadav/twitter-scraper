import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [query, setQuery] = useState('');
  const [tweets, setTweets] = useState([]);
  const [error, setError] = useState('');

  const fetchTweets = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/tweets?query=${query}`);
      setTweets(response.data);
      setError('');
    } catch (err) {
      setError('Error fetching tweets');
      setTweets([]);
    }
  };

  return (
    <div>
      <h1>Twitter Scraper</h1>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search Twitter"
      />
      <button onClick={fetchTweets}>Search</button>
      {error && <p>{error}</p>}
      <ul>
        {tweets.map((tweet) => (
          <li key={tweet.id}>{tweet.text}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
