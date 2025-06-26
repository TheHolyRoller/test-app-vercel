'use client';

/* eslint-disable no-unused-vars */
import { useState, useEffect, useContext, createContext } from 'react';

// Setup the context
const UserContext = createContext();

// Create a provider component
export const UserProvider = ({ children }) => {
  const [sound, setSound] = useState(true); 
  const [name, setName] = useState('');
  const [userAge, setUserAge] = useState(); 

  const setUserSound = (userSound) => {
    setSound(userSound);
  };

  const toggleUserSound = () => {

    setSound(!sound)  


  }

  const setUserType = (age) => {
    setUserAge(age); 
  };

  const setUserName = (userName) => {
    setName(userName);
  };

  // Debug effect - remove in production
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      console.log('User state updated:', { name, sound, userAge });
    }
  }, [name, sound, userAge]);

  return (
    <UserContext.Provider value={{ name, sound, userAge, setUserName, setUserSound, setUserType, toggleUserSound }}>
      {children}
    </UserContext.Provider>
  );
};


// Custom hook to consume the context
export const useUser = () => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }

  return context;
};
