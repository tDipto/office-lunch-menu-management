import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../contexts/AuthContext";

const PrivateRoute = (props) => {
  const { Component } = props;
  const { admin } = useContext(AuthContext);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("Atoken");
  useEffect(() => {
    // console.log(data?.getCurrentUser);
    if (admin?.verifyAdmin === "no" || !role) {
      localStorage.removeItem("token");
      navigate("/login");
    }
  }, [admin]);

  return (
    <div>
      <Component />
    </div>
  );
};

export default PrivateRoute;
