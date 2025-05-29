import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [step, setStep] = useState(1); // 1: Email input, 2: Verification code, 3: New password
    const [verificationCode, setVerificationCode] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleEmailSubmit = async (e) => {
        e.preventDefault();
        setError("");
        // Here you would typically make an API call to send the verification code
        // For demo purposes, we'll just move to the next step
        setStep(2);
    };

    const handleVerificationSubmit = async (e) => {
        e.preventDefault();
        setError("");
        // Here you would verify the code with your backend
        // For demo purposes, we'll just move to the next step
        setStep(3);
    };

    const handlePasswordReset = async (e) => {
        e.preventDefault();
        setError("");

        if (newPassword !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        if (newPassword.length < 8) {
            setError("Password must be at least 8 characters long");
            return;
        }

        // Here you would make an API call to reset the password
        // For demo purposes, we'll just show success and redirect
        setSuccess("Password reset successful!");
        setTimeout(() => {
            navigate("/login");
        }, 2000);
    };

    return (
        <div
            className="w-full h-screen flex items-center justify-center"
        >
            <div className="w-full max-w-md p-8 space-y-8">
                <div className="text-center">
                    <h1 className="font-bold text-[32px] ">
                        {step === 1 && "Forgot Password"}
                        {step === 2 && "Enter Verification Code"}
                        {step === 3 && "Reset Your Password"}
                    </h1>
                    <p className="mt-[15px] text-[16px] opacity-70">
                        {step === 1 && "Enter your email address to receive a verification code"}
                        {step === 2 && "Enter the verification code sent to your email"}
                        {step === 3 && "Create a new password for your account"}
                    </p>
                </div>

                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                        <span className="block sm:inline">{error}</span>
                    </div>
                )}

                {success && (
                    <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
                        <span className="block sm:inline">{success}</span>
                    </div>
                )}

                {step === 1 && (
                    <div className="w-[450px] h-[300px] mt-[2rem] bg-[#fff] flex justify-center items-center m-auto rounded-[50px]">
                        <form onSubmit={handleEmailSubmit} className="flex flex-col gap-4 justify-center items-center">
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
                                        className="appearance-none block w-[350px] px-[10px] py-[20px] bg-[#D9D9D9] border-none rounded-[25px] h-[30px] placeholder-gray-400 focus:outline-none focus:opacity-80 focus:text-[#16404D] transition duration-150 ease-in-out"
                                        placeholder="Enter your email"
                                    />
                                </div>
                            </div>
                            <button
                                type="submit"
                                className="w-[350px] flex justify-center py-3 px-4 bg-[#16404D] text-[#fff] border border-transparent rounded shadow-sm text-sm font-medium hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out"
                            >
                                Send Verification Code
                            </button>
                        </form>
                    </div>
                )}

                {step === 2 && (
                    <div className="w-[450px] h-[300px] mt-[2rem] bg-[#fff] flex justify-center items-center m-auto rounded-[50px]">
                        <form onSubmit={handleVerificationSubmit} className="mt-[2rem] flex flex-col gap-4 justify-center items-center">
                            <div className="w-full">
                                <label htmlFor="code" className="block font-medium">
                                    Verification Code
                                </label>
                                <div className="mt-[5px] relative">
                                    <input
                                        id="code"
                                        type="text"
                                        required
                                        value={verificationCode}
                                        onChange={(e) => setVerificationCode(e.target.value)}
                                        className="appearance-none block w-[350px] px-[10px] py-[20px] bg-[#D9D9D9] border-none rounded-[25px] h-[30px] placeholder-gray-400 focus:outline-none focus:opacity-80 focus:text-[#16404D] transition duration-150 ease-in-out"
                                        placeholder="Enter verification code"
                                    />
                                </div>
                            </div>
                            <button
                                type="submit"
                                className="w-[350px] flex justify-center py-3 px-4 bg-[#16404D] text-[#fff] border border-transparent rounded shadow-sm text-sm font-medium hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out"
                            >
                                Verify Code
                            </button>
                        </form>
                    </div>
                )}

                {step === 3 && (
                    <div className="w-[450px] h-[300px] mt-[2rem] bg-[#fff] flex justify-center items-center m-auto rounded-[50px]">
                        <form onSubmit={handlePasswordReset} className="mt-[2rem] flex flex-col gap-4 justify-center items-center">
                            <div className="w-full">
                                <label htmlFor="newPassword" className="block font-medium">
                                    New Password
                                </label>
                                <div className="mt-[5px] relative">
                                    <input
                                        id="newPassword"
                                        type="password"
                                        required
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        className="appearance-none block w-[350px] px-[10px] py-[20px] bg-[#D9D9D9] border-none rounded-[25px] h-[30px] placeholder-gray-400 focus:outline-none focus:opacity-80 focus:text-[#16404D] transition duration-150 ease-in-out"
                                        placeholder="Enter new password"
                                    />
                                </div>
                            </div>
                            <div className="w-full">
                                <label htmlFor="confirmPassword" className="block font-medium">
                                    Confirm Password
                                </label>
                                <div className="mt-[5px] relative">
                                    <input
                                        id="confirmPassword"
                                        type="password"
                                        required
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        className="appearance-none block w-[350px] px-[10px] py-[20px] bg-[#D9D9D9] border-none rounded-[25px] h-[30px] placeholder-gray-400 focus:outline-none focus:opacity-80 focus:text-[#16404D] transition duration-150 ease-in-out"
                                        placeholder="Confirm new password"
                                    />
                                </div>
                            </div>
                            <button
                                type="submit"
                                className="w-[350px] flex justify-center py-3 px-4 bg-[#16404D] text-[#fff] border border-transparent rounded shadow-sm text-sm font-medium hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out"
                            >
                                Reset Password
                            </button>
                        </form>
                    </div>
                )}

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

export default ForgotPassword; 