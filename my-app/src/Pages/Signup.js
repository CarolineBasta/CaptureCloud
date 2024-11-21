import React, { useState } from 'react';
import logo from '../Assets/Logo/Logo.png';
import { useNavigate } from 'react-router-dom';

function Signup() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password1, setPassword1] = useState("");
    const [password2, setPassword2] = useState("");
    const [error, setError] = useState("");
    const [passwordValidation, setPasswordValidation] = useState({
        hasMinLength: false,
        hasNumber: false,
        hasSpecialChar: false,
        hasUppercase: false,
    });

    const navigate = useNavigate();

    const [isChecked, setIsChecked] = useState(false);

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
    };    

    const validEmail = (email) => {
        const emailFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailFormat.test(email);
    };

    const validatePassword = (password) => {
        const validations = {
            hasMinLength: password.length >= 6,
            hasNumber: /\d/.test(password),
            hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
            hasUppercase: /[A-Z]/.test(password),
        };
        setPasswordValidation(validations);
    };

    const handleCreateAccount = (e) => {
        e.preventDefault();

        if (name === "") {
            setError("please enter your name.");
            return;
        }

        if (email === "") {
            setError("please enter your email.");
            return;
        }

        if (!validEmail(email)) {
            setError("invalid email address.");
            return;
        }

        if (password1 === "") {
            setError("please enter a password.");
            return;
        }

        if (password2 === "") {
            setError("please re-type your password.");
            return;
        }

        if (password1 !== password2) {
            setError("passwords don't match.");
            return;
        }

        if (!isChecked) {
            setError("You must agree to the terms and conditions.");
            return;
        }        

        setError("");
        navigate('/home');
    };

    return (
        <div style={{ backgroundColor: '#F0F0F0' }} className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-8">
            <div className="z-10">
                <img src={logo} alt="Logo" className="w-40 sm:w-48 md:w-56 lg:w-64 xl:w-72" />
            </div>
            <div className="sm:pt-6 md:pt-8 lg:pt-10">
                <h1 className="text-4xl text-center mb-6">CREATE ACCOUNT</h1>
            </div>
            <div
                className={`bg-ccBlue p-12 rounded-3xl border border-black w-5/12 mx-auto shadow-lg flex flex-col justify-between transition-all duration-300 ${
                    password1 ? "max-h-[514px]" : "max-h-[416px]"
                }`}
            >
                <form className="space-y-6" onSubmit={handleCreateAccount} noValidate>
                    <div className="flex items-center">
                        <label htmlFor="full name" className="mr-4 w-28">
                            Full Name
                        </label>
                        <input
                            type="text"
                            id="full name"
                            placeholder="Type full name"
                            className={`w-full p-2 border ${
                                error === "please enter your name." ? "border-red-500" : "border-black"
                            } rounded-2xl shadow-lg text-xs focus:outline-none focus:ring-black focus:border-black bg-[#F5F5F5]`}
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    <div className="flex items-center">
                        <label htmlFor="email" className="mr-4 w-28">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            placeholder="Type email address"
                            className={`w-full p-2 border ${
                                error === "please enter your email." || error === "invalid email address."
                                    ? "border-red-500"
                                    : "border-black"
                            } rounded-2xl shadow-lg text-xs focus:outline-none focus:ring-black focus:border-black bg-[#F5F5F5]`}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="flex items-center">
                        <label htmlFor="password" className="mr-4 w-28">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password1"
                            placeholder="Type password"
                            className={`w-full p-2 border ${
                                error === "please enter a password." || error === "passwords don't match."
                                    ? "border-red-500"
                                    : "border-black"
                            } rounded-2xl shadow-lg text-xs focus:outline-none focus:ring-black focus:border-black bg-[#F5F5F5]`}
                            value={password1}
                            onChange={(e) => {
                                setPassword1(e.target.value);
                                validatePassword(e.target.value);
                            }}
                        />
                    </div>

                    {password1 && (
                        <ul className="mt-0 text-xs space-y-1 ml-44">
                            <li className="flex items-center">
                                <span className={`mr-2 ${passwordValidation.hasMinLength ? "text-green-600" : "text-red-600"}`}>
                                    {passwordValidation.hasMinLength ? "✔" : "✘"}
                                </span>
                                At least 6 characters
                            </li>
                            <li className="flex items-center">
                                <span className={`mr-2 ${passwordValidation.hasNumber ? "text-green-600" : "text-red-600"}`}>
                                    {passwordValidation.hasNumber ? "✔" : "✘"}
                                </span>
                                At least 1 number
                            </li>
                            <li className="flex items-center">
                                <span className={`mr-2 ${passwordValidation.hasSpecialChar ? "text-green-600" : "text-red-600"}`}>
                                    {passwordValidation.hasSpecialChar ? "✔" : "✘"}
                                </span>
                                At least 1 special character
                            </li>
                            <li className="flex items-center">
                                <span className={`mr-2 ${passwordValidation.hasUppercase ? "text-green-600" : "text-red-600"}`}>
                                    {passwordValidation.hasUppercase ? "✔" : "✘"}
                                </span>
                                At least 1 uppercase letter
                            </li>
                        </ul>
                    )}

                    <div className="flex items-center">
                        <label htmlFor="password" className="mr-4 w-28">
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            id="password2"
                            placeholder="Re-type password"
                            className={`w-full p-2 border ${
                                error === "please re-type your password." || error === "passwords don't match."
                                    ? "border-red-500"
                                    : "border-black"
                            } rounded-2xl shadow-lg text-xs focus:outline-none focus:ring-black focus:border-black bg-[#F5F5F5]`}
                            value={password2}
                            onChange={(e) => setPassword2(e.target.value)}
                        />
                    </div>

                    <label className="flex items-center pb-2 ml-36 text-sm">
                            <input type="checkbox" className={"form-checkbox accent-black"} checked={isChecked} onChange={handleCheckboxChange} />
                            <span className="ml-2 underline">I agree to the terms and conditions</span>
                    </label>

                    <div className="flex flex-col items-center space-y-4">
                        <button
                            type="submit"
                            className="w-1/3 h-8 bg-zinc-100 hover:bg-zinc-200 rounded-2xl border border-black shadow-lg"
                        >
                            Create Account
                        </button>
                    </div>
                </form>
                {error && <p className="text-red-600 text-center mt-4 text-sm relative bottom-1">{error}</p>}
            </div>
            <p className="mt-6 text-center">
                Already have an account? <a href="/login" className="text-sky-500 hover:text-sky-600 underline">Login here!</a>
            </p>
            <div style={{ backgroundColor: '#F0F0F0' }} className="h-8"></div> 
        </div>
    );
}

export default Signup;
