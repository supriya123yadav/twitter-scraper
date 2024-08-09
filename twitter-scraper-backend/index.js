const express = require('express');
const { TwitterApi } = require('twitter-api-v2');
require('dotenv').config();
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

// Configure Twitter client
const twitterClient = new TwitterApi({
  appKey: process.env.TWITTER_API_KEY,
  appSecret: process.env.TWITTER_API_SECRET_KEY,
  accessToken: process.env.TWITTER_ACCESS_TOKEN,
  accessSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
});

// Middleware
app.use(cors());
app.use(express.json());

// Endpoint to fetch tweets
app.get('/api/tweets', async (req, res) => {
  const query = req.query.query || '';
  try {
    const tweets = await twitterClient.v2.search(query, { max_results: 10 });
    res.json(tweets.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
