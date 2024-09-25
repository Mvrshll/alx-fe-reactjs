import { useState } from 'react'
import './App.css'
import { searchUsers } from './services/githubService'
import SearchForm from './components/SearchForm'
import Search from './components/Search'

function App() {
  const [users, setUsers] = useState([]);

  const handleSearch = async (query) => {
    const results = await searchUsers(query);
    setUsers(results);
  }

  return (
    <div className='App'>
      <h1 className="text-3xl font-bold text-center my-8">GitHub User Search</h1>
      <SearchForm onSearch={handleSearch} />
      <Search />
      <ul>
        {users.map(user => (
          <li key={user.id}>{user.login}</li>
        ))}
      </ul>
    </div>
  )
}

export default App