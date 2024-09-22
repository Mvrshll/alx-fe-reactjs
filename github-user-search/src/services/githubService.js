import axios from 'axios';

const BASE_URL = 'https://api.github.com/search/users?q=';

export const searchUsers = async (params, page = 1) => {
  const { username, location, minRepos } = params;
  let query = username;
  if (location) query += `+location:${location}`;
  if (minRepos) query += `+repos:>=${minRepos}`;

  try {
    const response = await axios.get(`${BASE_URL}${encodeURIComponent(query)}`, {
      params: {
        per_page: 30,
        page: page
      },
      headers: {
        Authorization: `token ${import.meta.env.VITE_GITHUB_API_KEY}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error searching users:', error);
    throw error;
  }
};