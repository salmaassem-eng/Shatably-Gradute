import { useState } from "react";
import { Link } from "react-router-dom";
import UserInput from "./UserInput";

export default function Register() {
    const [formData, setFormData] = useState({
        firstName : "",
        lastName : "",
        mobileNumber: "",
        email: "",
        password: "",
    });

    function handleChange(event) {
        const { name, value } = event.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };
    return (
        <div className="w-full h-full flex items-center justify-center ">
            <div className="w-full max-w-md p-8 space-y-8">
                <div className="text-center">
                    <h1 className="mt-6 font-bold">
                        Welcome to our platform
                    </h1>
                </div>

                <form className="mt-[2rem] flex flex-col gap-4 justify-center items-center">
                    <div className="space-y-4">
                        <div class="flex gap-6">
                            <div class="flex flex-col w-full max-w-xs">
                                <label for="firstName" className="block font-medium">
                                    First Name
                                </label>
                                <input
                                    id="firstName"
                                    type="text"
                                    placeholder="John"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    className="bg-[#D9D9D9] appearance-none w-[200px] px-[10px] py-[20px] border-none rounded-[25px] h-[30px] placeholder-gray-400  focus:outline-none focus:opacity-80 focus:text-[#16404D] transition duration-150 ease-in-out"
                                />
                            </div>

                            <div class="flex flex-col w-full max-w-xs">
                                <label for="lastName" class="mb-1 text-sm text-gray-800">Last Name</label>
                                <input
                                    id="lastName"
                                    type="text"
                                    placeholder="Doe"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    className="bg-[#D9D9D9] appearance-none w-[200px] px-[10px] py-[20px] border-none rounded-[25px] h-[30px] placeholder-gray-400  focus:outline-none focus:opacity-80 focus:text-[#16404D] transition duration-150 ease-in-out"
                                />
                            </div>
                        </div>

                        <UserInput labelName='Email address'
                            htmlFor="email"
                            id="email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter your email"
                        />

                        <UserInput labelName='Mobile Number'
                            htmlFor="mobileNumber"
                            id="mobileNumber"
                            name="mobileNumber"
                            type="phone"
                            value={formData.mobileNumber}
                            onChange={handleChange}
                            placeholder="+20-01#-####-####" />

                        <UserInput labelName='Password'
                            htmlFor="password"
                            id="password"
                            name="password"
                            type="password"
                            autoComplete="current-password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Enter your password" />
                    </div>

                    <div className="mt-[1.5rem]">
                        <button
                            type="submit"
                            className="w-full flex justify-center py-3 px-4 bg-[#16404D] text-[#fff] border border-transparent rounded shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out"
                        >
                            Sign up
                        </button>
                    </div>
                </form>

                <div className="text-center flex items-center gap-[10px] justify-center mt-[0.5rem]">
                    <p className="text-sm ">
                        Do have an account already?{" "}
                        <Link to='/login' className="font-medium text-blue-600 hover:text-blue-500">
                            Sign in
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}