import { Button } from "@material-tailwind/react";
import axios from "axios";

import { useEffect, useState } from "react";
import TotalItemCard from "./TotalItemCard/TotalItemCard";

const TotalItems = () => {
  const [user, setUser] = useState(null);
  const [menuId, setMenuId] = useState(null);
  const [choiceCount, setChoiceCount] = useState({});
  const [currentDate, setCurrentDate] = useState("");

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
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
    const fetchMenu = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/v1/menu/${currentDate}`
        );
        setMenuId(res.data.id);
      } catch (error) {
        setMenuId(null);
        console.error("Error fetching menu data:", error.message);
      }
    };

    if (currentDate) {
      fetchMenu();
    }
  }, [currentDate]);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!menuId) {
        setUser(null); // Clear user data if no menuId is available
        setChoiceCount({}); // Clear choice count if no menuId is available
        return;
      }

      try {
        const res = await axios.post(
          "http://localhost:5000/api/v1/choice/allChoice",
          { menuId }
        );
        setUser(res.data);
      } catch (error) {
        setUser(null);
        console.error("Error fetching user data:", error.message);
      }
    };

    fetchUserData();
  }, [menuId]);

  useEffect(() => {
    if (user) {
      const countChoices = (dataList) => {
        const counts = {};
        dataList.forEach((data) => {
          data.choices.forEach((choice) => {
            counts[choice] = (counts[choice] || 0) + 1;
          });
        });
        return counts;
      };

      setChoiceCount(countChoices(user));
    } else {
      setChoiceCount({});
    }
  }, [user]);

  const hasData = Object.keys(choiceCount).length > 0;

  return (
    <div>
      <h1>Total Items</h1>
      <div>
        <Button onClick={() => handleDateClick(0)}>Today</Button>
        <Button onClick={() => handleDateClick(-1)}>Yesterday</Button>
        <Button onClick={() => handleDateClick(1)}>Tomorrow</Button>
      </div>
      {hasData ? (
        <ul>
          {Object.entries(choiceCount).map(([choice, count]) => (
            // <li key={choice}>
            //   {choice}: {count}
            // </li>
            <TotalItemCard choice={choice} count={count} />
          ))}
        </ul>
      ) : (
        <p>No data</p>
      )}
    </div>
  );
};

export default TotalItems;
