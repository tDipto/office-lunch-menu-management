import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Login from "../components/Login/Login";
import Profile from "../components/Profile/Profile";
import Signup from "../components/Signup/Signup";
import Main from "../layout/Main";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />}>
          <Route index element={<Login />} />
          <Route path="profile" element={<Profile />} />
        </Route>

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
