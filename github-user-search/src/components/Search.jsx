import { useState } from 'react';
import { searchUsers } from '../services/githubService';

function Search() {
  const [searchParams, setSearchParams] = useState({
    username: '',
    location: '',
    minRepos: ''
  });
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchParams(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
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
      <form onSubmit={handleSubmit} className="mb-8">
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
          Search
        </button>
      </form>

      {isLoading && <p className="text-center">Loading...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {users.map(user => (
          <div key={user.id} className="border p-4 rounded">
            <img src={user.avatar_url} alt={`${user.login}'s avatar`} className="w-20 h-20 rounded-full mx-auto" />
            <h2 className="text-xl font-bold mt-2">{user.login}</h2>
            <p>{user.location}</p>
            <p>Repositories: {user.public_repos}</p>
            <a href={user.html_url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
              View Profile
            </a>
          </div>
        ))}
      </div>
      
      {users.length > 0 && (
        <button onClick={loadMore} className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
          Load More
        </button>
      )}
    </div>
  );
}

export default Search;