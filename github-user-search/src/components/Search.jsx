import { useState } from 'react';
import { fetchUserData, searchUsers } from '../services/githubService';

function Search() {
  const [username, setUsername] = useState('');
  const [searchParams, setSearchParams] = useState({
    username: '',
    location: '',
    minRepos: ''
  });
  const [userData, setUserData] = useState(null);
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [isAdvancedSearch, setIsAdvancedSearch] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchParams(prev => ({ ...prev, [name]: value }));
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleSingleUserSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setUserData(null);
    try {
      const data = await fetchUserData(username);
      setUserData(data);
    } catch (err) {
      setError('Looks like we cant find the user');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAdvancedSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setUsers([]);
    setPage(1);
    try {
      const data = await searchUsers(searchParams, 1);
      setUsers(data.items);
    } catch (err) {
      setError('Looks like we cant find any users matching your criteria');
    } finally {
      setIsLoading(false);
    }
  };

  const loadMore = async () => {
    setIsLoading(true);
    try {
      const data = await searchUsers(searchParams, page + 1);
      setUsers(prev => [...prev, ...data.items]);
      setPage(prev => prev + 1);
    } catch (err) {
      setError('Error loading more results');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="mb-4">
        <button
          onClick={() => setIsAdvancedSearch(false)}
          className={`mr-2 px-4 py-2 rounded ${!isAdvancedSearch ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          Single User Search
        </button>
        <button
          onClick={() => setIsAdvancedSearch(true)}
          className={`px-4 py-2 rounded ${isAdvancedSearch ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          Advanced Search
        </button>
      </div>

      {!isAdvancedSearch ? (
        <form onSubmit={handleSingleUserSubmit} className="mb-8">
          <input
            type="text"
            value={username}
            onChange={handleUsernameChange}
            placeholder="Enter GitHub username"
            className="p-2 border rounded mr-2"
            required
          />
          <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            Search User
          </button>
        </form>
      ) : (
        <form onSubmit={handleAdvancedSubmit} className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              type="text"
              name="username"
              value={searchParams.username}
              onChange={handleInputChange}
              placeholder="Enter GitHub username"
              className="p-2 border rounded"
              required
            />
            <input
              type="text"
              name="location"
              value={searchParams.location}
              onChange={handleInputChange}
              placeholder="Location"
              className="p-2 border rounded"
            />
            <input
              type="number"
              name="minRepos"
              value={searchParams.minRepos}
              onChange={handleInputChange}
              placeholder="Minimum repositories"
              className="p-2 border rounded"
            />
          </div>
          <button type="submit" className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            Advanced Search
          </button>
        </form>
      )}

      {isLoading && <p className="text-center">Loading...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}
      
      {!isAdvancedSearch && userData && (
        <div className="border p-4 rounded">
          <img src={userData.avatar_url} alt={`${userData.login}'s avatar`} className="w-20 h-20 rounded-full mx-auto" />
          <h2 className="text-xl font-bold mt-2">{userData.name || userData.login}</h2>
          <p>{userData.bio}</p>
          <p>{userData.location}</p>
          <p>Repositories: {userData.public_repos}</p>
          <a href={userData.html_url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
            View Profile
          </a>
        </div>
      )}

      {isAdvancedSearch && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {users.map(user => (
            <div key={user.id} className="border p-4 rounded">
              <img src={user.avatar_url} alt={`${user.login}'s avatar`} className="w-20 h-20 rounded-full mx-auto" />
              <h2 className="text-xl font-bold mt-2">{user.login}</h2>
              <a href={user.html_url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                View Profile
              </a>
            </div>
          ))}
        </div>
      )}
      
      {isAdvancedSearch && users.length > 0 && (
        <button onClick={loadMore} className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
          Load More
        </button>
      )}
    </div>
  );
}

export default Search;