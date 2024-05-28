import axios from "axios";
import React, { useEffect, useState } from "react";
import AuthContext from "../../contexts/AuthContext";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  //   const userToken = localStorage.getItem("token");

  useEffect(() => {
    const fetchUserData = async () => {
      const userToken = localStorage.getItem("token");
      try {
        const res = await axios.get(
          "http://localhost:5000/api/v1/employee/auth/verify",
          {
            headers: {
              Authorization: userToken,
            },
          }
        );
        // console.log(res.data);
        setUser(res.data);
      } catch (error) {
        console.error("Error fetching user data:", error.message);
      }
    };

    // if (userToken) {
    fetchUserData();
    // }
  }, []);

  const authInfo = {
    user,
    setUser,
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
