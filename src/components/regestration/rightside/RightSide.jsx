import React, { useState } from "react";
import { Link } from "react-router-dom";
import UserInput from "../UserInput";
// import "./RightSide.css";

const RightSide = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-full max-w-md p-8 space-y-8">
        <div className="text-center">
          <h1 className="mt-6 font-bold">
            Welcome to our platform
          </h1>
          <p className="mt-2 text-[20px]">
            Please sign in to your account
          </p>
        </div>
        
        <form className="mt-[2rem] flex flex-col gap-4 justify-center items-center">
          <div className="space-y-4">
            <UserInput labelName='Email address'
                  htmlFor="email"
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"/>
            
            <UserInput labelName='Password'
                  htmlFor="password"
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"/>
          </div>

          <div className="flex mt-[10px] items-center justify-between w-[350px]">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 bg-[#D9D9D9] focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <Link to="/forgot-password" className="font-medium text-[#16404D] hover:text-blue-500">
                Forgot your password?
              </Link>

            </div>
          </div>

          <div className="mt-[1.5rem]">
            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 bg-[#16404D] text-[#fff] border border-transparent rounded shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out"
            >
              Sign in
            </button>
          </div>
        </form>

        <div className="text-center flex items-center gap-[10px] justify-center mt-[0.5rem]">
          <p className="text-sm ">
            Don't have an account?{" "}
            <Link to='/RegisterationPage' className="font-medium text-blue-600 hover:text-blue-500">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RightSide; 