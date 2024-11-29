import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; 
import logo from '../Assets/Logo/Logo.png';

function Login() {
    useEffect(() => {document.title = 'Log In'; });
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false); 
    const [error, setError] = useState("");
    const [authCode, setAuthCode] = useState("");
    const [isAuthPopupOpen, setIsAuthPopupOpen] = useState(false);
    const [isForgotPopupOpen, setIsForgotPopupOpen] = useState(false);
    const [forgotEmail, setForgotEmail] = useState("");
    const [forgotError, setForgotError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [authError, setAuthError] = useState("");
    const navigate = useNavigate();

    


    const handleLogin = (e) => {
        e.preventDefault();

        setError("");
        setAuthError("");

        if (email === "") {
            setError("please enter your email.");
            return;
        }

        if (password === "") {
            setError("please enter your password.");
            return;
        }

        if (email !== "janedoe@gmail.com") {
            setError("incorrect email or password.");
            return;
        }

        if (password !== "Fox245.") {
            setError("incorrect email or password.");
            return;
        }

        setIsAuthPopupOpen(true);
    };

    const handleAuthSubmit = () => {
        if (authCode === "5748332") {
            setIsAuthPopupOpen(false); 
            navigate('/home'); 
        } else {
            setAuthError("Incorrect authentication code.");
        }
    };

    const handleClosePopup = () => {
        setIsAuthPopupOpen(false); 
        setIsForgotPopupOpen(false);
        setError(""); 
        setForgotError(""); 
        setForgotEmail("");
        setAuthError("");
    };

    const handleForgotPassword = () => {
        setForgotEmail("");
        setSuccessMessage("");
        setIsForgotPopupOpen(true);
    };

    const handleForgotSubmit = () => {
        setForgotError(""); 
        if (forgotEmail === "") {
            setForgotError("Please enter your email.");
            return;
        }
    
        setSuccessMessage(`A password reset link has been sent to ${forgotEmail}. Please check your inbox.`);
        setForgotEmail(""); 
    };
    

    return (
        <div className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-8">
            <div className="fixed top-0 left-0 right-0 z-50 flex justify-center">
                <img src={logo} alt="Logo" className="w-32 sm:w-36 md:w-40 lg:w-48 xl:w-52" />
            </div>
            <div className="sm:pt-6 md:pt-8 lg:pt-10 mt-32">
                <h1 className="text-3xl text-center mb-3">LOG IN</h1>
            </div>
            <div className="bg-ccBlue p-12 rounded-3xl border border-black w-5/12 mx-auto shadow-lg flex flex-col justify-between">
                <form className="space-y-7" onSubmit={handleLogin} noValidate>
                    <div className="flex items-center">
                        <label htmlFor="email" className="mr-10 w-32">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            placeholder="Type email address"
                            className={`w-full p-2 border ${(error === "please enter your email." || error === "incorrect email or password.") ? "border-red-500" : "border-black"} rounded-2xl shadow-lg text-xs focus:outline-none focus:ring-black focus:border-black bg-[#FAFAFA] placeholder:italic`}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="flex items-center relative">
                        <label htmlFor="password" className="mr-10 w-32">
                            Password
                        </label>
                        <input
                            type={showPassword ? "text" : "password"} 
                            id="password"
                            placeholder="Type password"
                            className={`w-full p-2 border ${(error === "please enter your password." || error === "incorrect email or password.") ? "border-red-500" : "border-black"} rounded-2xl shadow-lg text-xs focus:outline-none focus:ring-black focus:border-black bg-[#FAFAFA] placeholder:italic`}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button
                            type="button"
                            className="absolute right-3"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? (
                                <FaEyeSlash className="text-gray-500" />
                            ) : (
                                <FaEye className="text-gray-500" />
                            )}
                        </button>
                    </div>
                    {error && <p className="text-red-600 text-center text-sm h-0">{error}</p>}
                    <div className="flex flex-col items-center relative">
                        <button
                            type="submit"
                            className="w-1/4 h-8 bg-zinc-100 hover:bg-zinc-200 rounded-2xl border border-black shadow-lg"
                        >
                            Log In
                        </button>
                    </div>
                </form>
                <p onClick={handleForgotPassword} className="text-center relative top-2 text-black text-sm cursor-pointer">
                    <a className="text-black hover:text-gray-700 underline">Forgot Password?</a>
                </p>
            </div>
            <p className="mt-6 text-center">
                Don’t have an account? <a href="/signup" className="text-sky-500 hover:text-sky-600 underline">Sign up here!</a>
            </p>

            <div style={{ backgroundColor: '#F0F0F0' }} className="h-24"></div>
            

            {isAuthPopupOpen && (
                <div className="fixed inset-0 flex justify-center items-center z-50 bg-gray-600 bg-opacity-50">
                    <div className="bg-[#FAFAFA] p-6 rounded-2xl shadow-lg border-2 border-black w-3/4 md:w-1/2 lg:w-1/3 xl:w-1/4 mx-auto relative overflow-y-auto">
                        <button
                            className="absolute top-3 right-3 text-bold text-gray-500 hover:text-gray-700 text-2xl"
                            title="Close"
                            onClick={handleClosePopup}>
                            x
                        </button> 
                        <h1 className="text-3xl text-center mb-4 mt-6">Two-Factor Authentication</h1>
                        <div className="text-lg text-center mb-2">An email has been sent to {email}. Please enter the code from the email below:</div>
                        <input
                            type="text"
                            className="block w-full p-2 border-2 border-[#6AABD2] rounded-full focus:outline-none placeholder:italic placeholder:text-sm mb-4"
                            value={authCode}
                            onChange={(e) => setAuthCode(e.target.value)}
                            placeholder="Enter code"
                        />
                        {authError && <p className="text-red-600 text-center mt-4 text-sm">{authError}</p>}

                        <button
                            onClick={handleAuthSubmit}
                            className="text-black rounded-3xl shadow-md bg-[#CEECF5] hover:bg-[#C0DCE5] transition-colors w-28 h-10 mx-auto block mt-2"
                        >
                            Submit
                        </button>
                    </div>
                </div>
            )}

            {isForgotPopupOpen && (
                <div className={`fixed inset-0 flex justify-center items-center z-50 bg-gray-600 bg-opacity-50 `}>
                    <div className={`bg-[#FAFAFA] p-6 rounded-2xl shadow-lg border-2 border-black w-3/4 md:w-1/2 lg:w-1/3 xl:w-1/4 mx-auto relative overflow-y-auto`}>
                        <button
                            className="absolute top-3 right-3 text-bold text-gray-500 hover:text-gray-700 text-2xl"
                            title="Close"
                            onClick={handleClosePopup}>
                            x
                        </button> 
                        {successMessage ? ( // If a success message exists, display it
                            <div>
                                <p className="text-lg text-center mb-6">{successMessage}</p>
                                <button
                                    onClick={handleClosePopup}
                                    className="text-black rounded-3xl shadow-md bg-[#CEECF5] hover:bg-[#C0DCE5] transition-colors w-28 h-10 mx-auto block"
                                >
                                    Done
                                </button>
                            </div>
                        ) : ( // Otherwise, prompt user to fill forgot password form
                            <div>
                                <h1 className="text-3xl text-center mb-4 mt-6">Forgot Password</h1>
                                <div className="text-lg text-center mb-2">Enter your email to reset your password:</div>
                                <input
                                    type="text"
                                    className="block w-full p-2 border-2 border-[#6AABD2] rounded-full focus:outline-none placeholder:italic placeholder:text-sm mb-4"
                                    value={forgotEmail}
                                    onChange={(e) => setForgotEmail(e.target.value)}
                                    placeholder="Enter email"
                                />
                                {forgotError && <p className="text-red-600 text-center mt-4 text-sm">{forgotError}</p>}

                                <button
                                    onClick={handleForgotSubmit}
                                    className="text-black rounded-3xl shadow-md bg-[#CEECF5] hover:bg-[#C0DCE5] transition-colors w-28 h-10 mx-auto block mt-2"
                                >
                                    Submit
                                </button>
                            </div>
                         )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default Login;
