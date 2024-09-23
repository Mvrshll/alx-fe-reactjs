import { useState } from 'react';
import { fetchUserData, searchUsers } from '../services/githubService';

function Search() {
  const [searchMode, setSearchMode] = useState('single');
  const [singleUsername, setSingleUsername] = useState('');
  const [advancedParams, setAdvancedParams] = useState({
    username: '',
    location: '',
    minRepos: ''
  });
  const [userData, setUserData] = useState(null);
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    if (searchMode === 'single') {
      setSingleUsername(e.target.value);
    } else {
      const { name, value } = e.target;
      setAdvancedParams(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setUserData(null);
    setUsers([]);

    try {
      if (searchMode === 'single') {
        const data = await fetchUserData(singleUsername);
        if (data) {
          setUserData(data);
        } else {
          setError("Looks like we can't find the user");
        }
      } else {
        const data = await searchUsers(advancedParams, 1);
        if (data.items && data.items.length > 0) {
          setUsers(data.items);
        } else {
          setError("No users found matching the criteria");
        }
      }
    } catch (err) {
      setError('Error fetching user data');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4 text-white">
      <h1 className="text-3xl font-bold mb-6 text-center">GitHub User Search</h1>
      
      <div className="mb-6 flex justify-center">
        <button
          onClick={() => setSearchMode('single')}
          className={`px-4 py-2 rounded-l ${searchMode === 'single' ? 'bg-blue-500' : 'bg-gray-700'}`}
        >
          Single User Search
        </button>
        <button
          onClick={() => setSearchMode('advanced')}
          className={`px-4 py-2 rounded-r ${searchMode === 'advanced' ? 'bg-blue-500' : 'bg-gray-700'}`}
        >
          Advanced Search
        </button>
      </div>

      <form onSubmit={handleSubmit} className="mb-8">
        {searchMode === 'single' ? (
          <div className="flex">
            <input
              type="text"
              value={singleUsername}
              onChange={handleInputChange}
              placeholder="Enter GitHub username"
              className="flex-grow p-2 border rounded-l bg-gray-800 text-white"
              required
            />
            <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-r hover:bg-blue-600">
              Search
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              type="text"
              name="username"
              value={advancedParams.username}
              onChange={handleInputChange}
              placeholder="GitHub username"
              className="p-2 border rounded bg-gray-800 text-white"
            />
            <input
              type="text"
              name="location"
              value={advancedParams.location}
              onChange={handleInputChange}
              placeholder="Location"
              className="p-2 border rounded bg-gray-800 text-white"
            />
            <input
              type="number"
              name="minRepos"
              value={advancedParams.minRepos}
              onChange={handleInputChange}
              placeholder="Minimum repositories"
              className="p-2 border rounded bg-gray-800 text-white"
            />
            <button type="submit" className="col-span-3 mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
              Search
            </button>
          </div>
        )}
      </form>

      {isLoading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {searchMode === 'single' && userData && (
        <div>
          <h2 className="text-xl font-bold mb-2">{userData.name || userData.login}</h2>
          <p>Followers: {userData.followers}</p>
          <p>Public Repos: {userData.public_repos}</p>
        </div>
      )}

      {searchMode === 'advanced' && users.length > 0 && (
        <ul>
          {users.map(user => (
            <li key={user.id} className="mb-2">
              <img src={user.avatar_url} alt={user.login} className="w-10 h-10 rounded-full inline-block mr-2" />
              <span>{user.login}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Search;