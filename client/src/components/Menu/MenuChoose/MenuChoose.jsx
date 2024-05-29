import {
  Badge,
  Button,
  Card,
  CardBody,
  Checkbox,
  List,
  ListItem,
} from "@material-tailwind/react";
import axios from "axios";
import React, { useEffect, useState } from "react";

const MenuChoose = () => {
  const [items, setItems] = useState([]);
  const [menuId, setMenuId] = useState([]);
  const [userItem, setUserItem] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [selectedItems, setSelectedItems] = useState([]);

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
        const res = await axios.get(
          `http://localhost:5000/api/v1/menu/${currentDate}`
        );
        setMenuId(res?.data?.id);
        const newItems = res?.data?.options.map((option) => ({
          text: option,
          checked: false,
        }));

        setItems(newItems);
      } catch (error) {
        setItems([]);
        console.error("Error fetching user data:", error.message);
      }
    };
    const getMenu = async () => {
      try {
        const token = localStorage.getItem("token");
        // console.log(menuId);
        const res = await axios.post(
          `http://localhost:5000/api/v1/choice/getUserChoice`,
          { menuId: menuId },
          {
            headers: {
              Authorization: token,
            },
          }
        );
        setUserItem(res?.data?.choices);
        // console.log(res.data);
      } catch (error) {
        // setItems([]);
        setUserItem([]);
        console.error("Error fetching user data:", error.message);
      }
    };
    fetchMenu();
    getMenu();
  }, [currentDate]);

  const handleButtonClick = () => {
    const checkedItems = items
      .filter((item) => item.checked)
      .map((item) => item.text);
    // setSelectedItems(checkedItems);
    if (checkedItems.length > 0) {
      // alert(`Checked items: ${checkedItems.join(", ")}`);
      // console.log(checkedItems);
      const postChoice = async () => {
        try {
          const payload = {
            menuId: menuId,
            choices: checkedItems,
          };
          // console.log(payload);
          const userToken = localStorage.getItem("token");
          const res = await axios.post(
            `http://localhost:5000/api/v1/choice`,

            payload,

            {
              headers: {
                Authorization: userToken,
              },
            }
          );
          // console.log(res.data.id);

          // setMenuId(res.data.id);
          // setItems([]);
          //   setUser(res.data);
        } catch (error) {
          // setItems([]);

          console.error("Error post choice:", error.message);
        }
      };
      postChoice();
    } else {
      alert("No items selected");
    }
  };

  const handleCheckboxChange = (index) => {
    const newItems = [...items];
    newItems[index].checked = !newItems[index].checked;
    setItems(newItems);
  };

  return (
    <div>
      <div className="p-4 flex">
        <div className="flex-1">
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
            </List>
          </Card>

          <Button onClick={handleButtonClick}>Add to List</Button>
        </div>
        {/* {inputValue && <div className="mt-4 p-4 border">{inputValue}</div>} */}

        <div className="flex-1 ml-4">
          <Badge content={userItem.length}>
            <Button>
              <h1>Selected Items for {currentDate}</h1>
            </Button>
          </Badge>
          {/* {console.log(userItem)} */}
          {/* {userItem.map((item, i) => (
            <h1>{item}</h1>
          ))} */}

          {userItem.length > 0 ? (
            <CardBody className="w-96">
              <List>
                {userItem.map((item, i) => (
                  <ListItem>{item}</ListItem>
                ))}
              </List>
            </CardBody>
          ) : (
            <p>No products available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MenuChoose;
