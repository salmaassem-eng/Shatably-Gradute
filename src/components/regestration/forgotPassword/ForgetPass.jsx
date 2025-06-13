import React, { useState } from "react";
import {Link} from "react-router-dom";

const ForgetPass = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (!email) {
      setError("Email is required");
      return;
    }
    setLoading(true);
    try {
      // Call your backend API to send the reset email
      await fetch('https://shatably.runasp.net/api/Auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      // You can check response status or just always show the message for security
      setSuccess("If an account with this email exists, we've sent a password reset link. Please check your inbox.");
      setEmail("");
    } catch {
      setError("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
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
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative m-auto" role="alert">
            <span className="block sm:inline">{error}</span>
          </div>
        )}
        {success && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
            <span className="block sm:inline">{success}</span>
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
                  disabled={loading || !!success}
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-[324px] h-[48px] flex justify-center items-center py-3 px-4 bg-[#16404D] text-[#fff] border border-transparent rounded-[15px] shadow-sm text-[16px] font-medium hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out disabled:opacity-50"
              disabled={loading || !!success}
            >
              {loading ? 'Sending...' : 'Send Verification Code'}
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