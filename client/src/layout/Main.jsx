import React from "react";
import { Outlet } from "react-router-dom";
import SideBar from "../components/Sidebar/SideBar";
const Main = () => {
  return (
    <>
      <div style={{ display: "flex" }}>
        <SideBar />
        <div style={{ flex: 1, padding: "20px" }}>
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Main;
