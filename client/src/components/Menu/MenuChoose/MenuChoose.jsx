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
  const [items, setItems] = useState([
    { text: "Inbox", checked: false },
    { text: "Trash", checked: false },
    { text: "Settings", checked: false },
  ]);
  const [inputValue, setInputValue] = useState("");

  //   const handleInputChange = (event) => {
  //     setInputValue(event.target.value);
  //   };

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/v1/menu/2024-06-21"
        );
        // console.log(res.data.options);
        const newItems = res.data.options.map((option) => ({
          text: option,
          checked: false,
        }));

        // Update the state with the new items
        setItems(newItems);
      } catch (error) {
        console.error("Error fetching user data:", error.message);
      }
    };
    fetchMenu();
  }, []);

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
      <Card className="w-96 mb-4">
        <List>
          {items.map((item, index) => (
            <ListItem key={index} className="flex items-center">
              <Checkbox
                id={`checkbox-${index}`}
                label={item.text}
                ripple={true}
                checked={item.checked}
                onChange={() => handleCheckboxChange(index)}
              />
            </ListItem>
          ))}
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
