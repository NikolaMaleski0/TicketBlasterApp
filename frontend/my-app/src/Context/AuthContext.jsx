import React, { useState, createContext, useEffect } from 'react';
import axios from 'axios';
import jwtDecode from 'jwt-decode';

export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState('');
  const [userId, setUserId] = useState('');
  const [userDefaultImg, setUserDefaultImage] = useState('');
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const updatedSearchQuery = (query) => {
    setSearchQuery(query);
    localStorage.setItem('searchQuery', query);
  };

  const updateDefaultImg = (newImage) => {
    setUserDefaultImage(newImage);
  };

  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem('jwt');
       console.log(token);
      if (token) {
        const decodedToken = jwtDecode(token);
         console.log(decodedToken);
        setUserRole(decodedToken.role);
        setUserId(decodedToken.id);

        const response = await axios.get(`/api/v1/user/get-user/${decodedToken.id}`);
         console.log(response);
        const oneUser = response.data.data.oneUser;
        setUserDefaultImage(oneUser.image);
        console.log(oneUser);
         console.log("slika:", oneUser.image);
        setUserName(oneUser.name);
        setUserEmail(oneUser.email);
         console.log('decoded token:', decodedToken);
      } 
    } catch(err) {
      console.log(err);
    };
  };


  const loginSuccess = async () => {
    setIsLoggedIn(true);
    await fetchUserData();
  };

  const logOut = () => {
    localStorage.clear('jwt');
    setIsLoggedIn(false);
  };

  
  useEffect(() => {
    const token = localStorage.getItem('jwt');
    if (token) {
      setIsLoggedIn(true);
      fetchUserData();
    };
  }, []);


  return (
    <AuthContext.Provider value={{ isLoggedIn, userRole, userId, userDefaultImg, userName,  userEmail, searchQuery, updatedSearchQuery, updateDefaultImg, setIsLoggedIn, loginSuccess, logOut  }}>
      {children}
    </AuthContext.Provider>
  )
};
export default AuthContext;