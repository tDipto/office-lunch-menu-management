import { Button, Card, Input, List, ListItem } from "@material-tailwind/react";

import React, { useState } from "react";

const Menu = () => {
  const [items, setItems] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleButtonClick = () => {
    if (inputValue.trim() !== "") {
      setItems([...items, inputValue]);
      setInputValue("");
    }
  };
  return (
    <div className="p-4">
      <Button onClick={handleButtonClick}>Add to List</Button>
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
