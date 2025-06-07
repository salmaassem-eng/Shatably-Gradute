import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import UserInput from "../UserInput";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const validationSchema = Yup.object({
    firstName: Yup.string()
        .required("First name is required")
        .min(2, "First name must be at least 2 characters")
        .max(50, "First name must be less than 50 characters"),
    lastName: Yup.string()
        .required("Last name is required")
        .min(2, "Last name must be at least 2 characters")
        .max(50, "Last name must be less than 50 characters"),
    email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
    mobileNumber: Yup.string()
        .required("Mobile number is required")
        .matches(/^\+?[0-9]{10,15}$/, "Invalid mobile number format"),
    password: Yup.string()
        .required("Password is required")
        .min(8, "Password must be at least 8 characters")
        .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
        .matches(/[a-z]/, "Password must contain at least one lowercase letter")
        .matches(/[0-9]/, "Password must contain at least one number")
        .matches(/[^A-Za-z0-9]/, "Password must contain at least one special character"),
});

export default function Register() {
    const navigate = useNavigate();

    const handleSubmit = async (values, { setSubmitting }) => {
        try {
            const response = await fetch('https://shatably.runasp.net/api/Auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
            });

            const resData = await response.json();

            if (!response.ok) {
                toast.error(resData.message || 'Registration failed');
                return;
            }

            toast.success('Registration successful! Redirecting to login...');
            setTimeout(() => {
                navigate('/login');
            }, 2000);

        } catch (e) {
            if (e.message.includes('Failed to fetch')) {
                toast.error('Cannot connect to the server');
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
                </div>

                <Formik
                    initialValues={{
                        firstName: "",
                        lastName: "",
                        mobileNumber: "",
                        email: "",
                        password: "",
                    }}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                    validateOnChange={true}
                    validateOnBlur={true}
                >
                    {({ errors, touched, isSubmitting, values }) => (
                        <Form className="mt-[2rem] flex flex-col gap-4 justify-center items-center">
                            <div className="space-y-4">
                                <div className="flex gap-6">
                                    <div className="flex flex-col w-full max-w-xs">
                                        <UserInput
                                            labelName="First Name"
                                            name="firstName"
                                            type="text"
                                            placeholder="John"
                                            error={touched.firstName && errors.firstName && !values.firstName ? errors.firstName : null}
                                            className="w-[200px]"
                                        />
                                    </div>

                                    <div className="flex flex-col w-full max-w-xs">
                                        <UserInput
                                            labelName="Last Name"
                                            name="lastName"
                                            type="text"
                                            placeholder="Doe"
                                            error={touched.lastName && errors.lastName && !values.lastName ? errors.lastName : null}
                                            className="w-[200px]"
                                        />
                                    </div>
                                </div>

                                <UserInput
                                    labelName="Email address"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    placeholder="Enter your email"
                                    error={touched.email && errors.email && !values.email ? errors.email : null}
                                />

                                <UserInput
                                    labelName="Mobile Number"
                                    name="mobileNumber"
                                    type="tel"
                                    placeholder="+20-01#-####-####"
                                    error={touched.mobileNumber && errors.mobileNumber && !values.mobileNumber ? errors.mobileNumber : null}
                                />

                                <UserInput
                                    labelName="Password"
                                    name="password"
                                    type="password"
                                    autoComplete="new-password"
                                    placeholder="Enter your password"
                                    error={touched.password && errors.password && !values.password ? errors.password : null}
                                />
                            </div>

                            <div className="mt-[1.5rem]">
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full flex justify-center py-3 px-4 bg-[#16404D] text-[#fff] border border-transparent rounded shadow-sm text-sm font-medium hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#16404D] transition duration-150 ease-in-out disabled:opacity-50"
                                >
                                    {isSubmitting ? 'Signing up...' : 'Sign up'}
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>

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