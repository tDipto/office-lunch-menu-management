import { Link } from "react-router-dom";

import {
  ArrowLeftIcon,
  BuildingLibraryIcon,
  InformationCircleIcon,
  PencilIcon,
  UserCircleIcon,
} from "@heroicons/react/24/solid";
import {
  Card,
  List,
  ListItem,
  ListItemPrefix,
  Typography,
} from "@material-tailwind/react";
import React, { useContext } from "react";
import AuthContext from "../../contexts/AuthContext";
const SideBar = () => {
  const { user, admin, loading } = useContext(AuthContext);

  const handleLogout = () => {
    localStorage.removeItem("token"); // Replace
    localStorage.removeItem("Atoken"); // Replace
  };
  // const [open, setOpen] = React.useState(0);

  // const handleOpen = (value) => {
  //   setOpen(open === value ? 0 : value);
  // };
  return (
    <Card className="h-[calc(100vh-2rem)] w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5">
      <div className="mb-2 p-4">
        <Typography variant="h5" color="blue-gray">
          Lunch Management
        </Typography>
      </div>
      <List>
        <Link to="/totalItems">
          <ListItem>
            <ListItemPrefix>
              <InformationCircleIcon className="h-5 w-5" />
            </ListItemPrefix>
            Total Items
          </ListItem>
        </Link>
        <Link to="/employee">
          <ListItem>
            <ListItemPrefix>
              <BuildingLibraryIcon className="h-5 w-5" />
            </ListItemPrefix>
            See All Employee
          </ListItem>
        </Link>
        <Link to="/menuChoose">
          <ListItem>
            <ListItemPrefix>
              <PencilIcon className="h-5 w-5" />
            </ListItemPrefix>
            Menu Choose
          </ListItem>
        </Link>
        <Link to="/menu">
          <ListItem>
            <ListItemPrefix>
              <PencilIcon className="h-5 w-5" />
            </ListItemPrefix>
            Menu Select
          </ListItem>
        </Link>
        <Link to="/">
          <ListItem>
            <ListItemPrefix>
              <UserCircleIcon className="h-5 w-5" />
            </ListItemPrefix>
            Profile
          </ListItem>
        </Link>
        {/* <Link to="/login">
          <ListItem>
            <ListItemPrefix>
              <UserCircleIcon className="h-5 w-5" />
            </ListItemPrefix>
            Login
          </ListItem>
        </Link>
        <Link to="/signup">
          <ListItem>
            <ListItemPrefix>
              <UserCircleIcon className="h-5 w-5" />
            </ListItemPrefix>
            Signup
          </ListItem>
        </Link> */}
        <Link to="/login" onClick={handleLogout}>
          <ListItem>
            <ListItemPrefix>
              <ArrowLeftIcon className="h-5 w-5" />
            </ListItemPrefix>
            Logout
          </ListItem>
        </Link>

        {/* <ListItem>
          <ListItemPrefix>
            <Cog6ToothIcon className="h-5 w-5" />
          </ListItemPrefix>
          Settings
        </ListItem>
        <ListItem>
          <ListItemPrefix>
            <PowerIcon className="h-5 w-5" />
          </ListItemPrefix>
          Log Out
        </ListItem> */}
      </List>
    </Card>
  );
};

export default SideBar;
