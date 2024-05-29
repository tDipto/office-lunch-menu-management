import axios from "axios";
import React, { useEffect, useState } from "react";
import AuthContext from "../../contexts/AuthContext";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);
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
      } finally {
        setLoading(false);
      }
    };

    // if (userToken) {
    fetchUserData();
    // }
  }, []);

  useEffect(() => {
    const fetchAdminData = async () => {
      const userToken = localStorage.getItem("Atoken");
      // console.log(userToken);
      try {
        const res = await axios.get(
          "http://localhost:5000/api/v1/admin/auth/verify",
          {
            headers: {
              Authorization: userToken,
            },
          }
        );
        // console.log(res.data);
        setAdmin(res.data);
      } catch (error) {
        console.error("Error fetching user data:", error.message);
      } finally {
        setLoading(false);
      }
    };

    // if (userToken) {
    fetchAdminData();
    // }
  }, []);

  const authInfo = {
    user,
    setUser,
    admin,
    setAdmin,
    loading,
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
