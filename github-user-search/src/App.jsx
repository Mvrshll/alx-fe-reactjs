import { useState } from 'react'
import './App.css'
import { searchUsers } from './services/githubService'
import SearchForm from './components/SearchForm'

function App() {
  const [users, setUsers] = useState([]);

  const handleSearch = async (query) => {
    const results = await searchUsers(query);
    setUsers(results);
  }

  return (
    <div className='App'>
      <h1>GitHub User Search</h1>
      <SearchForm onSearch={handleSearch} />
      <ul>
        {users.map(user => (
          <li key={user.id}>{user.login}</li>
        ))}
      </ul>
    </div>
  )
}

export default App