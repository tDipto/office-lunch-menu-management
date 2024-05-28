import axios from "axios";
import { useEffect, useState } from "react";

const TotalItems = () => {
  const [user, setUser] = useState(null);
  const [menuId, setMenuId] = useState(null);
  const [date, setDate] = useState("2024-06-21");
  const [choiceCount, setChoiceCount] = useState({});
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

    const countChoices = (dataList) => {
      const counts = {};
      dataList?.forEach((data) => {
        data.choices.forEach((choice) => {
          counts[choice] = (counts[choice] || 0) + 1;
        });
      });
      return counts;
    };

    // if (us fetchMenu();erToken) {
    fetchMenu();
    if (menuId) {
      fetchUserData();
      setChoiceCount(countChoices(user));
    }
    // }
  }, [menuId, user]);
  return (
    <div>
      <h1>total items</h1>
      {/* {console.log(choiceCount)} */}
      {Object.entries(choiceCount).map(([choice, count]) => (
        <li>
          {choice}:{count}
        </li>
      ))}
    </div>
  );
};

export default TotalItems;
