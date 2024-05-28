import { Button, Card, Input, List, ListItem } from "@material-tailwind/react";
import axios from "axios";

import React, { useEffect, useState } from "react";

const Menu = () => {
  const [items, setItems] = useState([]);
  const [inputValue, setInputValue] = useState("");
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

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleButtonClick = () => {
    if (inputValue.trim() !== "") {
      setItems([...items, inputValue]);
      setInputValue("");
    }
  };
  const handleSubmitClick = () => {
    const postMenu = async () => {
      try {
        const payload = {
          date: currentDate,
          options: items,
        };
        console.log(payload);
        const userToken = localStorage.getItem("Atoken");
        const res = await axios.post(
          `http://localhost:5000/api/v1/menu`,

          payload,

          {
            headers: {
              Authorization: userToken,
            },
          }
        );
        // console.log(res.data.id);

        // setMenuId(res.data.id);
        setItems([]);
        //   setUser(res.data);
      } catch (error) {
        console.error("Error post menu:", error.message);
      }
    };
    postMenu();
  };
  return (
    <div className="p-4">
      <div>
        <Button onClick={() => handleDateClick(0)}>Today</Button>

        <Button onClick={() => handleDateClick(1)}>Tomorrow</Button>
      </div>
      <Button onClick={handleButtonClick}>Add to List</Button>
      <Button onClick={handleSubmitClick}>Submit</Button>
      <div className="w-72 mb-4 mt-5">
        <Input
          label="Add Item"
          value={inputValue}
          onChange={handleInputChange}
        />
      </div>
      <Card className="w-96 mb-4">
        <List>
          {items.map((item, index) => (
            <ListItem key={index}>{item}</ListItem>
          ))}
        </List>
      </Card>
    </div>
  );
};

export default Menu;
