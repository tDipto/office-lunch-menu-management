import {
  Button,
  Card,
  Checkbox,
  List,
  ListItem,
} from "@material-tailwind/react";
import React, { useState } from "react";

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
