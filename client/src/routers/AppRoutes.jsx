import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import EmployeeList from "../components/EmployeeList/EmployeeList";
import AdminLogin from "../components/Login/AdminLogin";
import Login from "../components/Login/Login";
import Menu from "../components/Menu/Menu";
import MenuChoose from "../components/Menu/MenuChoose/MenuChoose";
import Profile from "../components/Profile/Profile";
import Signup from "../components/Signup/Signup";
import TotalItems from "../components/TotalItems/TotalItems";
import Main from "../layout/Main";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />}>
          <Route index element={<Login />} />
          <Route path="profile" element={<Profile />} />
          <Route path="menu" element={<Menu />} />
          <Route path="menuChoose" element={<MenuChoose />} />
          <Route path="/employee" element={<EmployeeList />} />
          <Route path="/totalItems" element={<TotalItems />} />
        </Route>

        <Route path="/login" element={<Login />} />
        <Route path="/Adminlogin" element={<AdminLogin />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
