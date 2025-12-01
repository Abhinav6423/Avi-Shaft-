import React, { useState, useEffect } from "react";
import AuthContext from "./authContext";
import { getMeData } from "../Api-Calls/get-meData";

const AuthProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);  // FIXED

  const fetchUserData = async () => {
    try {
      const result = await getMeData();
      setUserData(result);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false); // stop only after fetching completes
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const reloadUser = async () => {
    setLoading(true);
    await fetchUserData();
  };

  return (
    <AuthContext.Provider value={{ userData, loading, reloadUser  }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
