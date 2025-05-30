import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserInput from "../UserInput";
import { useAuth } from "../../../context/AuthContext";
// import "./RightSide.css";

const RightSide = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!formData.email || !formData.password) {
      setError("Please fill in all fields");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('https://shatably.runasp.net/api/Auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const resData = await response.json();

      if (!response.ok) {
        if (response.status === 404 || resData.message?.toLowerCase().includes('not found')) {
          setError("This email is not registered. Please sign up first.");
          return;
        }
        if (response.status === 401 || resData.message?.toLowerCase().includes('invalid')) {
          setError("Invalid email or password.");
          return;
        }
        setError(resData.message || 'Login failed. Please try again.');
        return;
      }
      
      if (resData.token) {
        login(resData.token, resData.user);
        navigate('/');
      }
      
      return resData.message;

    } catch (e) {
      console.error('Login error:', e);
      if (e.message.includes('Failed to fetch')) {
        setError('Cannot connect to the server.');
      } else {
        setError('Something went wrong. Please try again.');
      }
    } finally {
      setLoading(false);
    }
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

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-[2rem] flex flex-col gap-4 justify-center items-center">
          <div className="space-y-4">
            <UserInput 
              labelName='Email address'
              htmlFor="email"
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email" 
            />

            <UserInput 
              labelName='Password'
              htmlFor="password"
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password" 
            />
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
              disabled={loading}
              className="w-full flex justify-center py-3 px-4 bg-[#16404D] text-[#fff] border border-transparent rounded shadow-sm text-sm font-medium hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#16404D] transition duration-150 ease-in-out disabled:opacity-50"
            >
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
          </div>
        </form>

        <div className="text-center flex items-center gap-[10px] justify-center mt-[0.5rem]">
          <p className="text-sm">
            Don't have an account?{" "}
            <Link to='/RegisterationPage' className="font-medium text-[#16404D] hover:opacity-80">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RightSide; 