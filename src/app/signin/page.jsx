"use client";
import { useState } from "react";
import { z } from "zod";
import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import Link from "next/link";
import { signInUser } from "../services/signin";
import { useRouter } from "next/navigation";

const schema = z.object({
  username: z.string().nonempty("Username is required"), // Changed 'email' to 'username'
  password: z.string().min(6, "Password must be at least 6 characters long"),
  terms: z.boolean().optional(),
});

const SignIn = () => {
  const [formValues, setFormValues] = useState({
    username: "", // Changed 'email' to 'username'
    password: "",
    terms: false,
  });
  const router = useRouter();

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      schema.parse(formValues);
      setErrors({});
      const response = await signInUser({
        username: formValues.username, // Changed 'email' to 'username'
        password: formValues.password,
      });
      console.log("Form data submitted:", response);
      if (response.token) {
        localStorage.setItem("token", response.token);
        router.push("/home");
      }
    } catch (err) {
      if (err instanceof z.ZodError) {
        const newErrors = err.errors.reduce((acc, curr) => {
          if (curr.path[0]) {
            acc[curr.path[0]] = curr.message;
          }
          return acc;
        }, {});
        setErrors(newErrors);
      }
    }
  };

  return (
    <div className="w-[90%] m-auto h-[100vh] flex flex-col justify-center items-center">
      <Card color="transparent" shadow={false} className="w-[100%]">
        <Typography variant="h4" color="blue-gray">
          Sign In
        </Typography>
        <Typography color="gray" className="mt-1 font-normal">
          Welcome to telematch! Enter your details.
        </Typography>
        <form
          className="mt-8 mb-2 w-full max-w-screen-lg sm:w-96"
          onSubmit={handleSubmit}
        >
          <div className="mb-1 flex flex-col gap-6">
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Your Email
            </Typography>
            <Input
              size="lg"
              placeholder="Enter your email"
              name="username" // Changed 'name' to 'username'
              value={formValues.username}
              onChange={handleChange}
              className={`!border-t-blue-gray-200 focus:!border-t-gray-900 ${
                errors.username ? "border-red-500" : "" // Updated error reference from 'email' to 'username'
              }`}
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            {errors.username && ( // Updated error reference from 'email' to 'username'
              <p className="text-red-500 italic text-[13px] mt-[-15px]">
                {errors.username}
              </p>
            )}

            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Password
            </Typography>
            <Input
              type="password"
              size="lg"
              placeholder="********"
              name="password"
              value={formValues.password}
              onChange={handleChange}
              className={`!border-t-blue-gray-200 focus:!border-t-gray-900 ${
                errors.password ? "border-red-500" : ""
              }`}
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            {errors.password && (
              <p className="text-red-500 italic text-[13px] mt-[-15px]">
                {errors.password}
              </p>
            )}
          </div>
          <div className="mb-4 flex items-center">
            <Checkbox
              name="terms"
              checked={formValues.terms}
              onChange={handleChange}
              containerProps={{ className: "-ml-2.5" }}
            />
            <Typography
              variant="small"
              color="gray"
              className="flex items-center font-normal mt-[4px]"
            >
              I agree to the
              <a
                href="#"
                className="font-medium transition-colors hover:text-gray-900"
              >
                &nbsp;Terms and Conditions
              </a>
            </Typography>
          </div>
          {errors.terms && (
            <p className="text-red-500 italic text-[13px] mt-[-15px]">
              {errors.terms}
            </p>
          )}

          <Button className="mt-6" fullWidth type="submit">
            Sign In
          </Button>
          <Typography color="gray" className="mt-4 text-center font-normal">
            Don’t have an account?{" "}
            <Link href="/" className="font-bold text-gray-900">
              Sign Up
            </Link>
          </Typography>
        </form>
      </Card>
    </div>
  );
};

export default SignIn;
