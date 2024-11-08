import logo from '../Assets/Logo/Logo.png';

function Login() {
    return (
        <div className="bg-loginPage-bg h-screen flex flex-col items-center justify-center">
            <img src={logo} alt="Logo" className="w-56 mb-16" />
            <h1 className="text-4xl text-center mb-6">LOG IN</h1>
            <div className="bg-ccBlue p-16 rounded-3xl border border-black w-2/5 mx-auto shadow-lg">
            <form className="space-y-7">
                    <div className="flex items-center">
                        <label htmlFor="email" className="mr-10  w-32">
                            Email
                        </label>
                        <input type="email" id="email" placeholder="Type email address"
                            className="w-full p-2 border border-gray-300 rounded-2xl shadow-lg text-xs focus:outline-none  focus:ring-black focus:border-black" />
                    </div>
                    <div className="flex items-center">
                        <label htmlFor="password" className="mr-10 w-32">
                            Password
                        </label>
                        <input type="password" id="password" placeholder="Type password"
                            className="w-full p-2 border border-gray-300 rounded-2xl shadow-lg text-xs focus:outline-none  focus:ring-black focus:border-black" />
                    </div>
                    <div className="flex flex-col items-center space-y-4"> 
                        <label className="flex items-center pb-2">
                            <input type="checkbox" className="form-checkbox accent-black" />
                            <span className="ml-2">Remember password</span>
                        </label>
                        <button type="submit"
                                className="w-1/4 h-8 bg-zinc-100 hover:bg-zinc-200 rounded-2xl border border-black shadow-lg">
                            Log In
                        </button>
                    </div>
                </form>
            </div>
            <p className="mt-6 text-center">
                Don’t have an account? <a href="/signup" className="text-sky-500 hover:text-sky-600">Sign up here!</a>
            </p>
        </div>
    );
}

export default Login;

