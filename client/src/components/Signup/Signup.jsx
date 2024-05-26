import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Input,
  Typography,
} from "@material-tailwind/react";
import React from "react";
import { Link } from "react-router-dom";
const Signup = () => {
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
      <CardBody className="flex flex-col gap-4">
        <Input label="Username" size="lg" />
        <Input label="Email" size="lg" />
        <Input label="Password" size="lg" />
        {/* <div className="-ml-2.5">
          <Checkbox label="Remember Me" />
        </div> */}
      </CardBody>
      <CardFooter className="pt-0">
        <Button variant="gradient" fullWidth>
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
    </Card>
  );
};

export default Signup;
