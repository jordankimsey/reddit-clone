import { createContext, useContext, useEffect, useState } from 'react';
import { Hub, Auth } from 'aws-amplify';

const UserContext = createContext(null);

export const AuthContext = ({children}) => {
  const [user, setUser] = useState({});

  useEffect(() => {
    Hub.listen('auth', () => {
      //perform some action to update state whenever an auth event is detected.
      checkUser();
    });
      checkUser();
  }, []);

  async function checkUser() {
    try {
      const amplifyUser = await Auth.currentAuthenticatedUser();
      if (amplifyUser) {
        setUser(amplifyUser);
      }
    } catch (error) {
      //No current signed in user
        console.log(error)
        setUser(null)
    }
  }

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
