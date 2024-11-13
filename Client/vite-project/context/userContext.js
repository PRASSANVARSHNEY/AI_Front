import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

// Create the userContext
export const userContext = createContext({});

// UserContextProvider component to provide user state to the app
export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // If there is no user already, make the request to fetch the user data
    if (!user) {
      axios
        .get('/profile') // Modify this endpoint according to your actual backend
        .then(({ data }) => {
          setUser(data); // Set the user data received from the backend
        })
        .catch((error) => {
          console.error('Error fetching user profile:', error);
        });
    }
  }, [user]); // Dependency array ensures this runs when `user` changes or is null initially

  return (
    <userContext.Provider value={{ user, setUser }}>
      {children}
    </userContext.Provider>
  );
}
