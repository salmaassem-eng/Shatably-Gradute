import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserInput from "./UserInput";

export default function Register() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        mobileNumber: "",
        email: "",
        password: "",
    });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    function handleChange(event) {
        const { name, value } = event.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setLoading(true);

    // Basic validation
    if (
        !formData.email ||
        !formData.password ||
        !formData.firstName ||
        !formData.lastName ||
        !formData.mobileNumber
    ) {
        setError("Please fill in all fields");
        setLoading(false);
        return;
    }

    try {
        const response = await fetch('https://shatably.runasp.net/api/Auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                firstName: formData.firstName,
                lastName: formData.lastName,
                mobileNumber: formData.mobileNumber,
                email: formData.email,
                password: formData.password,
            }),
        });

        const resData = await response.json();

        if (!response.ok) {
            console.error('Registration failed:', resData);
            setError(resData.message || 'Registration failed.');
            return;
        }

        navigate('/login');
        return resData.message;

    } catch (e) {
        if (e.message.includes('Failed to fetch')) {
            setError('Cannot connect to the server.');
        } else {
            setError(e.message || 'Something went wrong. Please try again.');
        }
    } finally {
        setLoading(false);
    }
}


    return (
        <div className="w-full h-full flex items-center justify-center">
            <div className="w-full max-w-md p-8 space-y-8">
                <div className="text-center">
                    <h1 className="mt-6 font-bold">
                        Welcome to our platform
                    </h1>
                </div>

                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                        <span className="block sm:inline">{error}</span>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="mt-[2rem] flex flex-col gap-4 justify-center items-center">
                    <div className="space-y-4">
                        <div className="flex gap-6">
                            <div className="flex flex-col w-full max-w-xs">
                                <label htmlFor="firstName" className="block font-medium">
                                    First Name
                                </label>
                                <input
                                    id="firstName"
                                    name="firstName"
                                    type="text"
                                    placeholder="John"
                                    required
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    className="bg-[#D9D9D9] appearance-none w-[200px] px-[10px] py-[20px] border-none rounded-[25px] h-[30px] placeholder-gray-400  focus:outline-none focus:opacity-80 focus:text-[#16404D] transition duration-150 ease-in-out"
                                />
                            </div>

                            <div className="flex flex-col w-full max-w-xs">
                                <label htmlFor="lastName" className="mb-1 text-sm text-gray-800">Last Name</label>
                                <input
                                    id="lastName"
                                    name="lastName"
                                    type="text"
                                    placeholder="Doe"
                                    required
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    className="bg-[#D9D9D9] appearance-none w-[200px] px-[10px] py-[20px] border-none rounded-[25px] h-[30px] placeholder-gray-400  focus:outline-none focus:opacity-80 focus:text-[#16404D] transition duration-150 ease-in-out"
                                />
                            </div>
                        </div>

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
                            labelName='Mobile Number'
                            htmlFor="mobileNumber"
                            id="mobileNumber"
                            name="mobileNumber"
                            type="tel"
                            required
                            value={formData.mobileNumber}
                            onChange={handleChange}
                            placeholder="+20-01#-####-####"
                        />

                        <UserInput
                            labelName='Password'
                            htmlFor="password"
                            id="password"
                            name="password"
                            type="password"
                            autoComplete="new-password"
                            required
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Enter your password"
                        />
                    </div>

                    <div className="mt-[1.5rem]">
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full flex justify-center py-3 px-4 bg-[#16404D] text-[#fff] border border-transparent rounded shadow-sm text-sm font-medium hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#16404D] transition duration-150 ease-in-out disabled:opacity-50"
                        >
                            {loading ? 'Signing up...' : 'Sign up'}
                        </button>
                    </div>
                </form>

                <div className="text-center flex items-center gap-[10px] justify-center mt-[0.5rem]">
                    <p className="text-sm">
                        Do have an account already?{" "}
                        <Link to='/login' className="font-medium text-[#16404D] hover:opacity-80">
                            Sign in
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}