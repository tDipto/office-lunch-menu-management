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
const Login = () => {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values) => {
      // alert(JSON.stringify(values, null, 2));
      try {
        const result = await axios.post(
          "http://localhost:5000/api/v1/employee/auth/login",
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
          Sign In
        </Typography>
      </CardHeader>
      <form onSubmit={formik.handleSubmit}>
        <CardBody className="flex flex-col gap-4">
          <Input
            id="email"
            onChange={formik.handleChange}
            value={formik.values.email}
            label="Email"
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
        </CardBody>
        <CardFooter className="pt-0">
          <Button type="submit" variant="gradient" fullWidth>
            Sign In
          </Button>
          <Typography variant="small" className="mt-6 flex justify-center">
            Don&apos;t have an account?
            <Link to="/signup">
              <Typography
                as="a"
                href="#signup"
                variant="small"
                color="blue-gray"
                className="ml-1 font-bold"
              >
                Sign up
              </Typography>
            </Link>
          </Typography>

          <Typography variant="small" className="mt-6 flex justify-center">
            Admin?
            <Link to="/adminLogin">
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

export default Login;
