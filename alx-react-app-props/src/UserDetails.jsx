import { useContext } from 'react';
import UserContext from './UserContext';

function UserDetails() {
  const { user } = useContext(UserContext); // access data using useContext

  return (
    <div>
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
    </div>
  );
}

export default UserDetails;