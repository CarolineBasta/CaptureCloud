import React, { useState, useEffect } from 'react';
import logo from '../Assets/Logo/Logo.png';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; 

function Signup() {
    useEffect(() => {document.title = 'Sign Up';});
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
    const [showPassword, setShowPassword] = useState(false); 
    const [showConfirmPassword, setShowConfirmPassword] = useState(false); 
    const [isTermsPopupOpen, setIsTermsPopupOpen] = useState(false);
    const [isChecked, setIsChecked] = useState(false);

    const navigate = useNavigate();

    const handleCheckboxChange = () => {
        if (!isChecked) {
            setIsChecked(true); 
        } else {
            setIsChecked(false); 
        }
    };
    
    const handleTermsClick = () => {
        setIsTermsPopupOpen(true); 
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

        if (!passwordValidation.hasMinLength || !passwordValidation.hasNumber || !passwordValidation.hasSpecialChar || !passwordValidation.hasUppercase) {
            setError("password does not meet the criteria.");
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
        <div className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-8">
            <div className="flex justify-center">
                <img src={logo} alt="Logo" className="w-32 sm:w-36 md:w-40 lg:w-48 xl:w-52" />
            </div>
            <div className="sm:pt-6 md:pt-8 lg:pt-10">
                <h1 className="text-3xl text-center mb-3">SIGN UP</h1>
            </div>
            <div
                className={`bg-ccBlue p-12 rounded-3xl border border-black w-5/12 mx-auto shadow-lg flex flex-col justify-between transition-all duration-300 
                `}
            >
                <form className="space-y-6" onSubmit={handleCreateAccount} noValidate>
                    <div className="flex items-center">
                        <label htmlFor="full name" className="mr-10 w-32">
                            Full Name
                        </label>
                        <input
                            type="text"
                            id="full name"
                            placeholder="Type full name"
                            className={`w-full p-2 border ${
                                error === "please enter your name." ? "border-red-500" : "border-black"
                            } rounded-2xl shadow-lg text-xs focus:outline-none focus:ring-black focus:border-black bg-[#FAFAFA] placeholder:italic`}
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    <div className="flex items-center">
                        <label htmlFor="email" className="mr-10 w-32">
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
                            } rounded-2xl shadow-lg text-xs focus:outline-none focus:ring-black focus:border-black bg-[#FAFAFA] placeholder:italic`}
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
                                id="password1"
                                placeholder="Type password"
                                className={`w-full p-2 border ${
                                    error === "please enter a password." || error === "passwords don't match." || error === "password does not meet the criteria."
                                        ? "border-red-500" : "border-black"
                                } rounded-2xl shadow-lg text-xs focus:outline-none focus:ring-black focus:border-black bg-[#FAFAFA] placeholder:italic`}
                                value={password1}
                                onChange={(e) => {
                                    setPassword1(e.target.value);
                                    validatePassword(e.target.value);
                                }}
                            />
                            <button
                                type="button"
                                className="absolute right-3 top-1/2 transform -translate-y-1/2"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? (
                                    <FaEyeSlash className="text-gray-500" />
                                ) : (
                                    <FaEye className="text-gray-500" />
                                )}
                            </button>
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

                    <div className="flex items-center relative h-10">
                        <label htmlFor="password" className="mr-10 w-32">
                            Confirm Password
                        </label>
                        <input
                            type={showConfirmPassword ? "text" : "password"} 
                            id="password2"
                            placeholder="Re-type password"
                            className={`w-full p-2 border ${
                                error === "please re-type your password." || error === "passwords don't match."
                                    ? "border-red-500" : "border-black"
                            } rounded-2xl shadow-lg text-xs focus:outline-none focus:ring-black focus:border-black bg-[#FAFAFA] placeholder:italic`}
                            value={password2}
                            onChange={(e) => setPassword2(e.target.value)}
                        />
                        <button
                            type="button"
                            className="absolute right-3 top-1/2 transform -translate-y-1/2"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                            {showConfirmPassword ? (
                                <FaEyeSlash className="text-gray-500" />
                            ) : (
                                <FaEye className="text-gray-500" />
                            )}
                        </button>
                    </div>

                    <label className="flex items-center ml-36 text-sm h-2">
                        <input type="checkbox" className={"form-checkbox accent-black"} checked={isChecked} onChange={handleCheckboxChange} />
                        <p className="ml-2">
                            I agree to the&nbsp;  
                        </p>
                        <label className="text-sky-500 cursor-pointer hover:text-sky-600" onClick={handleTermsClick}>
                            terms and conditions
                        </label>
          
                    </label>

                    {error && <p className="text-red-600 text-center mt-4 text-sm h-1">{error}</p>}

                    <div className="flex flex-col items-center">
                        <button
                            type="submit"
                            className="w-1/4 h-8 bg-zinc-100 hover:bg-zinc-200 rounded-2xl border border-black shadow-lg"
                        >
                            Sign Up
                        </button>
                    </div>
                </form>
            </div>
            <p className="mt-6 text-center">
                Already have an account? <a href="/login" className="text-sky-500 hover:text-sky-600 underline">Login here!</a>
            </p>
            <div style={{ backgroundColor: '#F0F0F0' }} className="h-8"></div> 

            {isTermsPopupOpen && (
                <div className="fixed inset-0 flex justify-center items-center z-50 bg-gray-600 bg-opacity-50">
                    <div className="bg-[#FAFAFA] p-6 rounded-2xl shadow-lg border-2 border-black w-3/4 md:w-1/2 lg:w-1/3 xl:w-1/4 mx-auto relative h-auto overflow-y-auto">
                        <button
                            className="absolute top-3 right-3 text-bold text-gray-500 hover:text-gray-700 text-2xl"
                            title="Close"
                            onClick={() => setIsTermsPopupOpen(false)}>
                            x
                        </button> 
                        <h1 className="text-3xl text-center mb-4 mt-6">Terms and Conditions</h1>
                        <div className="max-h-96 overflow-y-auto text-sm">

                        <h3 className="text-lg mb-2">Welcome to CaptureCloud</h3>
                        <p>
                            These Terms and Conditions govern your use of our website, including all features, tools, and services provided on or through CaptureCloud. By accessing or using this Site, you agree to be bound by these Terms.
                        </p>
                        
                        <h3 className="text-lg mt-4 mb-2">1. Account Registration</h3>
                        <p>
                            To access certain features of our website, including uploading and organizing photos, you must create an account. You are responsible for maintaining the confidentiality of your account information, including your username and password. You agree to notify us immediately if you suspect any unauthorized access to your account.
                        </p>
                        
                        <h3 className="text-lg mt-4 mb-2">2. Use of the Website</h3>
                        <p>
                            By using our website, you agree to:
                            <ul className="list-disc ml-4">
                            <li>Use the webiste for lawful purposes only.</li>
                            <li>Not upload photos or content that you do not have the legal right to share.</li>
                            <li>Not use the website to engage in any activities that may harm, disable, or interfere with the proper functioning of the website, or violate any applicable laws.</li>
                            </ul>
                        </p>

                        <h3 className="text-lg mt-4 mb-2">3. Photo Uploads and Content Ownership</h3>
                        <p>
                            When you upload photos to the website, you retain full ownership of your photos. However, by uploading photos, you grant CaptureCloud a non-exclusive, royalty-free, worldwide license to store, organize, and display your photos on the website for the purpose of managing your account. That being said, the only place these photos will be displayed is in your account, no other users will be able to view your photos.
                        </p>

                        <h3 className="text-lg mt-4 mb-2">4. Privacy and Data Protection</h3>
                        <p>
                            We are committed to protecting your privacy and handling your personal information responsibly. Please review our Privacy Policy for more information on how we collect, use, and protect your data.
                        </p>

                        <h3 className="text-lg mt-4 mb-2">5. User Conduct</h3>
                        <p>
                            You agree not to engage in the following:
                            <ul className="list-disc ml-4">
                            <li>Uploading illegal or inappropriate content.</li>
                            <li>Attempting to hack, interfere with, or disrupt the operation of the webiste.</li>
                            <li>Impersonating another user or falsely representing your affiliation with another individual or entity.</li>
                            <li>Sharing your login credentials with others or allowing unauthorized access to your account.</li>
                            </ul>
                        </p>

                        <h3 className="text-lg mt-4 mb-2">6. Termination and Suspension</h3>
                        <p>
                            We may suspend or terminate your account if we believe that you have violated these Terms. 
                        </p>

                        <h3 className="text-lg mt-4 mb-2">7. Limitation of Liability</h3>
                        <p>
                            CaptureCloud is not liable for any direct, indirect, incidental, or consequential damages arising from your use of the website, including but not limited to the loss of photos, loss of data, or any damages resulting from the use or inability to use the website.
                        </p>

                        <h3 className="text-lg mt-4 mb-2">8. Modifications to the Terms</h3>
                        <p>
                            We reserve the right to update, modify, or change these Terms at any time. Any changes will be posted on this page with an updated "Last Updated" date. Your continued use of the website after any changes to these Terms constitutes your acceptance of the new terms.
                        </p>

                        <h3 className="text-lg mt-4 mb-2">9. Governing Law</h3>
                        <p>
                            These Terms are governed by the laws of Canada, and you agree to submit to the exclusive jurisdiction of the courts located in Alberta for any disputes arising from or related to these Terms.
                        </p>

                        <h3 className="text-lg mt-4 mb-2">10. Contact Us</h3>
                        <p>
                            If you have any questions or concerns about these Terms, please contact us at admin@capturecloud.com.
                        </p>
                        </div>

                        <button
                            onClick={() => setIsTermsPopupOpen(false)}
                            className="text-black rounded-3xl shadow-md bg-[#CEECF5] hover:bg-[#C0DCE5] transition-colors w-28 h-10 mx-auto block mt-4"
                        >
                            Done
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Signup;
