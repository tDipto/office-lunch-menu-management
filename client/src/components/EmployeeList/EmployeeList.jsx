import { Button } from "@material-tailwind/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import EmployeeCard from "./EmployeeCard/EmployeeCard";

const EmployeeList = () => {
  const [user, setUser] = useState(null);
  const [menuId, setMenuId] = useState(null);
  const [currentDate, setCurrentDate] = useState("");

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based, so add 1
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const handleDateClick = (daysOffset) => {
    const date = new Date();
    date.setDate(date.getDate() + daysOffset);
    setCurrentDate(formatDate(date));
  };

  useEffect(() => {
    const today = new Date();
    setCurrentDate(formatDate(today));
  }, []);

  useEffect(() => {
    // const menuId = "dd1f0c71-a83f-4a40-96f4-c9ba7fde4375";
    const fetchMenu = async () => {
      try {
        // console.log(currentDate);

        const res = await axios.get(
          `http://localhost:5000/api/v1/menu/${currentDate}`
        );
        // console.log(res.data.id);

        setMenuId(res.data.id);
        //   setUser(res.data);
      } catch (error) {
        setMenuId(null);
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
        setUser();

        console.error("Error fetching user data:", error.message);
      }
    };

    // if (us fetchMenu();erToken) {
    fetchMenu();
    // console.log(menuId);
    if (menuId) {
      fetchUserData();
    } else {
      // console.log("DEBUG");
      setUser();
    }
    // }
  }, [menuId, currentDate]);

  return (
    <div>
      <h1>show employee lis</h1>
      <div>
        <Button onClick={() => handleDateClick(0)}>Today</Button>
        <Button onClick={() => handleDateClick(-1)}>Yesterday</Button>
        <Button onClick={() => handleDateClick(1)}>Tomorrow</Button>
      </div>

      {user && user.length > 0 ? (
        user.map((data, index) => <EmployeeCard key={index} data={data} />)
      ) : (
        <p>No data</p>
      )}
    </div>
  );
};

export default EmployeeList;
