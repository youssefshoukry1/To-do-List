"use client";
import { createContext, useState, useEffect } from "react";

// إنشاء الـ Context
const UserContext = createContext();

export function UserContextProvider({ children }) {
  const [isLogin, setLogin] = useState(null);
  const [mood, setMood] = useState('dark')

   const handleMood = ()=>{
    setMood(mood === 'dark' ? 'light' :  'dark')
  }

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("userToken");
      if (token !== null) {
        setLogin(token);
      }
    }
  }, []);

  return (
    <UserContext.Provider value={{ isLogin, setLogin ,mood,setMood}}>
      {children}
    </UserContext.Provider>
  );
}

export default UserContext;
