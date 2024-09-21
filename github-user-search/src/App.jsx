import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { searchUsers } from './services/githubService'

function App() {
  const [count, setCount] = useState(0)
  const [query, setQuery] = useState('');
  const [users, setUsers] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();
    const results = await searchUsers(query);
    setUsers(results);
  }

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className='App'>
        <h1>Github User Search</h1>
        <form onSubmit={handleSearch}>
          <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Enter a username" />
          <button type="submit">Search</button>
        </form>
        <ul>
          {users.map(user => (
            <li key={user.id}>{user.login}</li>
          ))}
        </ul>
      </div>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
