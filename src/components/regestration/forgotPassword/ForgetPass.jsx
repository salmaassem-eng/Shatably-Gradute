import React, { useState } from "react";
import { useNavigate ,  Link} from "react-router-dom";

const ForgetPass = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    setError("");
    // For now, just navigate to the new password page with email in state
    if (!email) {
      setError("Email is required");
      return;
    }
    navigate("/newpass", { state: { email } });
  };

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="w-full max-w-md p-8 space-y-8">
        <div className="text-center">
          <h1 className="font-bold text-[32px] ">Forgot Password</h1>
          <p className="mt-[15px] text-[16px] opacity-70">
            Enter your email address to receive a verification code
          </p>
        </div>
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <span className="block sm:inline">{error}</span>
          </div>
        )}
        <div className="w-[400px] h-[250px] mt-[2rem] bg-[#fff] flex justify-center items-center m-auto rounded-[50px] ">
          <form onSubmit={handleEmailSubmit} className="flex flex-col gap-[28px] justify-center items-center">
            <div className="w-full">
              <label htmlFor="email" className="block font-medium">
                Email address
              </label>
              <div className="mt-[5px] relative">
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none block w-[324px] px-[10px] py-[25px] bg-[#D9D9D9] border-none rounded-[15px] h-[44px] placeholder-gray-400 focus:outline-none focus:opacity-80 focus:text-[#16404D] transition duration-150 ease-in-out"
                  placeholder="Enter your email"
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-[324px] h-[48px] flex justify-center items-center py-3 px-4 bg-[#16404D] text-[#fff] border border-transparent rounded-[15px] shadow-sm text-[16px] font-medium hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out"
            >
              Send Verification Code
            </button>
          </form>
        </div>
        <div className="text-center mt-[1rem]">
          <Link
            to="/login"
            className="inline-flex items-center gap-2 text-[#16404D] hover:text-[#16404D] hover:translate-x-[-3px] transition duration-150 ease-in-out font-medium"
          >
            <svg
              className="w-[20px] h-[20px] "
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgetPass; 