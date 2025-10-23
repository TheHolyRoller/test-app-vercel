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
  const [nameEmailConsent, setNameEmailConsent] = useState(); 
  const [answerConsent, setAnswerConsent] = useState(); 


  useEffect(() => {
    console.log('this is the updated user age \n', userAge); 
  }, [userAge]); 


  const setUserSound = (userSound) => {
    setSound(userSound);
  };

  const toggleUserSound = () => {

    setSound(!sound);

  }

  const setUserType = (age) => {
    setUserAge(age); 
  };

  const setUserName = (userName) => {
    setName(userName);
  };

  const setNameConsent = (nameEmailConsent) => {

    setNameEmailConsent(!nameEmailConsent); 

  }

  const setResultsConsent = (answerConsent) => {

      setAnswerConsent(!answerConsent); 
  }

  // Create the IP capturing function here and call it from the use Effect hook

  const captureIP = async () => {


    console.log('capture user IP function \n'); 





  }


  useEffect(() => {

    console.log('')



  }, []); 



  // Debug effect - remove in production
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      console.log('User state updated:', { name, sound, userAge });
    }
  }, [name, sound, userAge]);
  
  return (
    <UserContext.Provider value={{ name, sound, userAge,nameEmailConsent, answerConsent, setUserName, setUserSound, setUserType, toggleUserSound, setResultsConsent, setNameConsent }}>
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
