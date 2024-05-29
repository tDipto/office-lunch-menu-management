import {
  Card,
  CardBody,
  CardFooter,
  Tooltip,
  Typography,
} from "@material-tailwind/react";
import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../../contexts/AuthContext";
const Profile = () => {
  const { user, admin, loading } = useContext(AuthContext);
  const [userInfo, setUserInfo] = useState();
  const [adminInfo, setAdminInfo] = useState();

  useEffect(() => {
    setUserInfo(user);
    setAdminInfo(admin);
  }, [user, admin]);

  return (
    <Card className="w-96">
      <CardBody className="text-center">
        <Typography variant="h4" color="blue-gray" className="mb-2">
          {userInfo?.username} {adminInfo?.username}
        </Typography>
        <Typography color="blue-gray" className="font-medium" textGradient>
          {userInfo?.email} {adminInfo?.verifyAdmin}
        </Typography>
      </CardBody>
      <CardFooter className="flex justify-center gap-7 pt-2">
        <Tooltip content="Like">
          <Typography
            as="a"
            href="#facebook"
            variant="lead"
            color="blue"
            textGradient
          >
            <i className="fab fa-facebook" />
          </Typography>
        </Tooltip>
        <Tooltip content="Follow">
          <Typography
            as="a"
            href="#twitter"
            variant="lead"
            color="light-blue"
            textGradient
          >
            <i className="fab fa-twitter" />
          </Typography>
        </Tooltip>
        <Tooltip content="Follow">
          <Typography
            as="a"
            href="#instagram"
            variant="lead"
            color="purple"
            textGradient
          >
            <i className="fab fa-instagram" />
          </Typography>
        </Tooltip>
      </CardFooter>
    </Card>
  );
};

export default Profile;
