import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  
  const localStorageData = JSON.parse(localStorage.getItem("login"));
  const [token, setToken] = useState(localStorageData?.token);
  const [user, setUser] = useState(localStorageData?.user);

  useEffect(()=>{

  }, [])

  return (
    <AuthContext.Provider value={{ token, setToken, user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
