import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../contexts/AuthContext";

const PublicRoute = (props) => {
  const { Component } = props;
  const { admin } = useContext(AuthContext);
  const navigate = useNavigate();
  const role = localStorage.getItem("Atoken");
  useEffect(() => {
    // console.log(data?.getCurrentUser);
    // console.log(role);
    if (admin?.verifyAdmin === "no" || role == null) {
      localStorage.removeItem("Atoken");
      navigate("/login");
    }
  }, [admin]);
  return (
    <div>
      <Component />
    </div>
  );
};

export default PublicRoute;
