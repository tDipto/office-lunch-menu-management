import axios from "axios";
import React, { useEffect, useState } from "react";
import EmployeeCard from "./EmployeeCard/EmployeeCard";

const EmployeeList = () => {
  const [user, setUser] = useState(null);
  const [menuId, setMenuId] = useState(null);
  const [date, setDate] = useState("2024-06-21");
  //   const userToken = localStorage.getItem("token");

  useEffect(() => {
    // const menuId = "dd1f0c71-a83f-4a40-96f4-c9ba7fde4375";
    const fetchMenu = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/v1/menu/2024-06-21"
        );
        // console.log(res.data.id);
        setMenuId(res.data.id);
        //   setUser(res.data);
      } catch (error) {
        console.error("Error fetching user data:", error.message);
      }
    };

    const fetchUserData = async () => {
      try {
        const res = await axios.post(
          "http://localhost:5000/api/v1/choice/allChoice",

          { menuId }
        );
        // console.log(res.data);
        setUser(res.data);
      } catch (error) {
        console.error("Error fetching user data:", error.message);
      }
    };

    // if (us fetchMenu();erToken) {
    fetchMenu();
    if (menuId) {
      fetchUserData();
    }
    // }
  }, [menuId]);

  return (
    <div>
      <h1>show employee lis</h1>
      {user?.map((data) => (
        <EmployeeCard data={data} />
      ))}
    </div>
  );
};

export default EmployeeList;
