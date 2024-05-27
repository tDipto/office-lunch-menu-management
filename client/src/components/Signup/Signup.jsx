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
const Signup = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
    },
    onSubmit: async (values) => {
      // alert(JSON.stringify(values, null, 2));
      // console.log(JSON.stringify(values));

      try {
        const result = await axios.post(
          "http://localhost:5000/api/v1/employee/auth/register",
          values
        );
        const token = await result?.data;
        navigate("/login");
        console.log(token);
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
          Registratioin
        </Typography>
      </CardHeader>
      <form onSubmit={formik.handleSubmit}>
        <CardBody className="flex flex-col gap-4">
          <Input
            id="username"
            onChange={formik.handleChange}
            value={formik.values.username}
            label="Username"
            size="lg"
          />
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
            Sign Up
          </Button>

          <Typography variant="small" className="mt-6 flex justify-center">
            Already Have an account?
            <Link to="/login">
              <Typography
                as="a"
                href="#signup"
                variant="small"
                color="blue-gray"
                className="ml-1 font-bold"
              >
                Sign In
              </Typography>
            </Link>
          </Typography>
        </CardFooter>
      </form>
    </Card>
  );
};

export default Signup;
