import { createContext, useState } from 'react';

const UserContext = createContext(null); // initial value can be null

export const UserProvider = ({ children, userData }) => {
  const [user, setUser] = useState(userData); // store user data in state

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;