import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Input,
  Typography,
} from "@material-tailwind/react";
import { useFormik } from "formik";
import React from "react";

import { Link } from "react-router-dom";
const AdminLogin = () => {
  const formik = useFormik({
    initialValues: {
      usename: "",
      password: "",
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
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
            id="usename"
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
