import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Input,
  Typography,
} from "@material-tailwind/react";
import axios from "axios";
import { useFormik } from "formik";
import React from "react";

import { Link, useNavigate } from "react-router-dom";
const AdminLogin = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit: async (values) => {
      //   alert(JSON.stringify(values, null, 2));
      try {
        const result = await axios.post(
          "http://localhost:5000/api/v1/admin/auth/login",
          values
        );
        const res = await result?.data;
        // console.log(res.token);
        localStorage.setItem("token", res.token);
        navigate("/");
      } catch (e) {
        console.error(e.response.data);
      }
    },
  });
  return (
    <Card className="w-96 mt-20 mx-auto">
      <CardHeader
        variant="gradient"
        color="gray"
        className="mb-4 grid h-28 place-items-center"
      >
        <Typography variant="h3" color="white">
          Admin
        </Typography>
      </CardHeader>
      <form onSubmit={formik.handleSubmit}>
        <CardBody className="flex flex-col gap-4">
          <Input
            id="username"
            onChange={formik.handleChange}
            value={formik.values.email}
            label="UserName"
            size="lg"
          />
          <Input
            id="password"
            type="password"
            onChange={formik.handleChange}
            value={formik.values.password}
            label="Password"
            size="lg"
          />
          {/* <div className="-ml-2.5">
          <Checkbox label="Remember Me" />
        </div> */}
        </CardBody>
        <CardFooter className="pt-0">
          <Button type="submit" variant="gradient" fullWidth>
            Enter
          </Button>
          <Typography variant="small" className="mt-6 flex justify-center">
            Employee?
            <Link to="/login">
              <Typography
                as="a"
                href="#signup"
                variant="small"
                color="blue-gray"
                className="ml-1 font-bold"
              >
                Here
              </Typography>
            </Link>
          </Typography>
        </CardFooter>
      </form>
    </Card>
  );
};

export default AdminLogin;
