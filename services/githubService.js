const axios = require('axios');

class GitHubService {
  constructor() {
    this.baseURL = 'https://api.github.com';
    this.token = process.env.GITHUB_TOKEN;
  }

  async getUserProfile(username) {
    try {
      const headers = {};
      if (this.token) {
        headers['Authorization'] = `token ${this.token}`;
      }
      
      const response = await axios.get(`${this.baseURL}/users/${username}`, {
        headers
      });
      
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 404) {
        throw new Error('GitHub user not found');
      }
      throw new Error(`GitHub API error: ${error.message}`);
    }
  }

  async getUserRepos(username) {
    try {
      const headers = {};
      if (this.token) {
        headers['Authorization'] = `token ${this.token}`;
      }
      
      const response = await axios.get(`${this.baseURL}/users/${username}/repos?per_page=100&sort=updated`, {
        headers
      });
      
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch repositories: ${error.message}`);
    }
  }

  async analyzeProfile(username) {
    const profile = await this.getUserProfile(username);
    const repos = await this.getUserRepos(username);
    
    const languages = {};
    let totalStars = 0;
    let totalForks = 0;
    
    repos.forEach(repo => {
      if (repo.language) {
        languages[repo.language] = (languages[repo.language] || 0) + 1;
      }
      totalStars += repo.stargazers_count;
      totalForks += repo.forks_count;
    });
    
    const topLanguages = Object.entries(languages)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([lang, count]) => ({ language: lang, count }));
    
    return {
      ...profile,
      analysis: {
        total_repositories: repos.length,
        total_stars: totalStars,
        total_forks: totalForks,
        top_languages: topLanguages,
        account_age_days: Math.floor((new Date() - new Date(profile.created_at)) / (1000 * 60 * 60 * 24))
      }
    };
  }
}

module.exports = new GitHubService();
