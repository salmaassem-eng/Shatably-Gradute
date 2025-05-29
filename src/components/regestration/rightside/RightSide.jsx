import React, { useState } from "react";
import { Link } from "react-router-dom";
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
          <p className="mt-2 text-[20px] opacity-70">
            Please sign in to your account
          </p>
        </div>
        
        <form className="mt-[2rem] flex flex-col gap-4 justify-center items-center">
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block font-medium ">
                Email address
              </label>
              <div className="mt-[5px] relative">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="appearance-none block w-[350px] px-[10px] py-[20px] mb-[15px] bg-[#D9D9D9] border-none rounded-[25px] h-[30px] placeholder-gray-400  focus:outline-none focus:opacity-80 focus:text-[#16404D] transition duration-150 ease-in-out "
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block font-lg ">
                Password
              </label>
              <div className="mt-[5px] relative">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="appearance-none block w-[350px] px-[10px] py-[20px] bg-[#D9D9D9] border-none rounded-[25px] h-[30px] placeholder-gray-400  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:opacity-80 focus:text-[#16404D] focus:border-transparent transition duration-150 ease-in-out"
                  placeholder="Enter your password"
                />
              </div>
            </div>
          </div>

          <div className="flex mt-[10px] items-center justify-between w-[350px]">
            <div className="flex gap-[3px] items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="checkboxBtn"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm">
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <Link to="/forgetpass" className="font-medium text-[#16404D] opacity-70 hover:text-[#16404D] hover:opacity-100">
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
            <a href="#" className="font-medium text-[#16404D] opacity-70 hover:text-[#16404D] hover:opacity-100">
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RightSide; 