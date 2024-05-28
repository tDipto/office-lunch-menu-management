import {
  Button,
  Card,
  Checkbox,
  List,
  ListItem,
} from "@material-tailwind/react";
import axios from "axios";

import React, { useEffect, useState } from "react";

const MenuChoose = () => {
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

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        console.log(currentDate);
        const res = await axios.get(
          `http://localhost:5000/api/v1/menu/${currentDate}`
        );
        // console.log(currentDate);
        const newItems = res?.data?.options.map((option) => ({
          text: option,
          checked: false,
        }));

        // Update the state with the new items
        setItems(newItems);
      } catch (error) {
        setItems([]);
        console.error("Error fetching user data:", error.message);
      }
    };
    fetchMenu();
  }, [currentDate]);

  const handleButtonClick = () => {
    if (inputValue.trim() !== "") {
      setItems([...items, { text: inputValue, checked: false }]);
      setInputValue("");
    }
  };

  const handleCheckboxChange = (index) => {
    const newItems = [...items];
    newItems[index].checked = !newItems[index].checked;
    setItems(newItems);
  };
  return (
    <div className="p-4">
      {/* <h1>{currentDate}</h1> */}
      <div>
        <Button onClick={() => handleDateClick(0)}>Today</Button>
        <Button onClick={() => handleDateClick(-1)}>Yesterday</Button>
        <Button onClick={() => handleDateClick(1)}>Tomorrow</Button>
      </div>

      <Card className="w-96 mb-4">
        <List>
          {items && items.length > 0 ? (
            items.map((item, index) => (
              <ListItem key={index} className="flex items-center">
                <Checkbox
                  id={`checkbox-${index}`}
                  label={item.text}
                  ripple={true}
                  checked={item.checked}
                  onChange={() => handleCheckboxChange(index)}
                />
              </ListItem>
            ))
          ) : (
            <p>No data</p>
          )}
          {}
        </List>
      </Card>
      {/* <div className="w-72 mb-4">
        <Input
          label="Add Item"
          value={inputValue}
          onChange={handleInputChange}
        />
      </div> */}
      <Button onClick={handleButtonClick}>Add to List</Button>
    </div>
  );
};

export default MenuChoose;
