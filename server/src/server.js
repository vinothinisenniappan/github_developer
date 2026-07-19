import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const GITHUB_API_URL = 'https://api.github.com';

// Middleware
app.use(cors());
app.use(express.json());

// GitHub API Helper
const getGitHubUser = async (username) => {
  try {
    const response = await axios.get(`${GITHUB_API_URL}/users/${username}`, {
      headers: {
        Accept: 'application/vnd.github.v3+json',
        ...(process.env.GITHUB_TOKEN && { Authorization: `token ${process.env.GITHUB_TOKEN}` })
      }
    });
    return response.data;
  } catch (error) {
    throw new Error(`User not found: ${username}`);
  }
};

const getGitHubRepos = async (username, page = 1, perPage = 100) => {
  try {
    const response = await axios.get(`${GITHUB_API_URL}/users/${username}/repos`, {
      params: {
        sort: 'updated',
        direction: 'desc',
        per_page: perPage,
        page
      },
      headers: {
        Accept: 'application/vnd.github.v3+json',
        ...(process.env.GITHUB_TOKEN && { Authorization: `token ${process.env.GITHUB_TOKEN}` })
      }
    });
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch repositories');
  }
};

// Routes
app.get("/", (req, res) => {
  res.send("GitHub Developer Insights API is running 🚀");
});
// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'Server running', timestamp: new Date().toISOString() });
});

// Get developer profile and analytics
app.get('/api/developer/:username', async (req, res) => {
  try {
    const { username } = req.params;

    // Fetch user profile
    const userProfile = await getGitHubUser(username);

    // Fetch all repositories (paginated)
    let allRepos = [];
    let page = 1;
    let hasMore = true;

    while (hasMore && page <= 5) {
      const repos = await getGitHubRepos(username, page, 100);
      if (repos.length === 0) {
        hasMore = false;
      } else {
        allRepos = [...allRepos, ...repos];
        page++;
      }
    }

    // Calculate statistics
    const stats = calculateStats(allRepos);

    res.json({
      profile: userProfile,
      repos: allRepos,
      stats
    });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

// Get repositories for a user
app.get('/api/repositories/:username', async (req, res) => {
  try {
    const { username } = req.params;
    const { page = 1, sortBy = 'updated' } = req.query;

    const repos = await getGitHubRepos(username, parseInt(page), 10);
    res.json({ repos, totalCount: repos.length });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Helper function to calculate statistics
function calculateStats(repos) {
  const stats = {
    totalRepos: repos.length,
    totalStars: 0,
    totalForks: 0,
    languages: {},
    topLanguages: [],
    createdByYear: {},
    averageStars: 0,
    averageForks: 0
  };

  repos.forEach(repo => {
    stats.totalStars += repo.stargazers_count || 0;
    stats.totalForks += repo.forks_count || 0;

    // Language tracking
    if (repo.language) {
      stats.languages[repo.language] = (stats.languages[repo.language] || 0) + 1;
    }

    // Year-based creation tracking
    const year = new Date(repo.created_at).getFullYear();
    stats.createdByYear[year] = (stats.createdByYear[year] || 0) + 1;
  });

  // Calculate averages
  stats.averageStars = repos.length > 0 ? Math.round(stats.totalStars / repos.length) : 0;
  stats.averageForks = repos.length > 0 ? Math.round(stats.totalForks / repos.length) : 0;

  // Get top languages
  stats.topLanguages = Object.entries(stats.languages)
    .map(([language, count]) => ({
      name: language,
      count,
      percentage: repos.length > 0 ? ((count / repos.length) * 100).toFixed(1) : 0
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);

  // Count total unique languages
  stats.totalLanguages = Object.keys(stats.languages).length;

  return stats;
}

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error' });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
