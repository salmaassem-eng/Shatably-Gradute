import React from "react";
import { Link, useNavigate } from "react-router-dom";
import UserInput from "../UserInput";
import { useAuth } from "../../../context/AuthContext";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import "./RightSide.css";

const validationSchema = Yup.object({
    email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
    password: Yup.string()
        .required("Password is required"),
});

const RightSide = () => {
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleSubmit = async (values, { setSubmitting }) => {
        try {
            const response = await fetch('https://shatably.runasp.net/api/Auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
            });

            const resData = await response.json();

            if (!response.ok) {
                if (response.status === 404 || resData.message?.toLowerCase().includes('not found')) {
                    toast.error("This email is not registered. Please sign up first.");
                    return;
                }
                if (response.status === 401 || resData.message?.toLowerCase().includes('invalid')) {
                    toast.error("Invalid email or password.");
                    return;
                }
                toast.error(resData.message || 'Login failed. Please try again.');
                return;
            }
            
            if (resData.token) {
                login(resData.token, resData.user);
                toast.success("Login successful! Redirecting...");
                setTimeout(() => {
                    navigate('/');
                }, 3000);
            }

        } catch (e) {
            console.error('Login error:', e);
            if (e.message.includes('Failed to fetch')) {
                toast.error('Cannot connect to the server.');
            } else {
                toast.error('Something went wrong. Please try again.');
            }
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="w-full h-full flex items-center justify-center">
            <div className="w-full max-w-md p-8 space-y-8">
                <ToastContainer position="top-right" autoClose={3000} />
                <div className="text-center">
                    <h1 className="mt-6 font-bold">
                        Welcome to our platform
                    </h1>
                    <p className="mt-2 text-[20px] opacity-60">
                        Please sign in to your account
                    </p>
                </div>

                <Formik
                    initialValues={{
                        email: "",
                        password: "",
                    }}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                    validateOnChange={true}
                    validateOnBlur={true}
                >
                    {({ errors, touched, isSubmitting }) => (
                        <Form className="mt-[2rem] flex flex-col gap-4 justify-center items-center">
                            <div className="w-full space-y-4">
                                <UserInput 
                                    labelName='Email address'
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    placeholder="Enter your email"
                                    error={touched.email && errors.email ? errors.email : null}
                                />

                                <UserInput 
                                    labelName='Password'
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    placeholder="Enter your password"
                                    error={touched.password && errors.password ? errors.password : null}
                                />
                            </div>
                            <div className="flex items-center justify-between w-[400px]">
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
                                    disabled={isSubmitting}
                                    className="w-full flex justify-center py-3 px-4 bg-[#16404D] text-[#fff] border border-transparent rounded shadow-sm text-sm font-medium hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#16404D] transition duration-150 ease-in-out disabled:opacity-50"
                                >
                                    {isSubmitting ? 'Signing in...' : 'Sign in'}
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>

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