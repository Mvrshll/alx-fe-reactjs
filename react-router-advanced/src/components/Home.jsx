import { useAuth } from '../AuthContext';

const Home = () => {
  const { login, logout } = useAuth();

  return (
    <div>
      <h1>Home</h1>
      <button onClick={login}>Login</button>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default Home;