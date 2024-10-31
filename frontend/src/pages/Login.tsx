import React from "react";

const Login : React.FC = () => {
    return(
        <div className="h-screen w-screen flex flex-col items-center justify-center bg-slate-300">
            <div className="h-1/2 w-2/3 sm:w-3/5 md:w-2/5 lg:w-1/3 xl:w-1/4 flex flex-col items-center py-10 bg-slate-100 shadow-lg">
                <h1 className="font-bold text-4xl text-indigo-900">Login</h1>

                <form className="h-full w-full flex flex-col items-center justify-center">
                    <input type="text" placeholder="Username" className="w-3/5 p-2 rounded-sm"/>
                    <input type="password" placeholder="Password" className="w-3/5 p-2 mt-3 rounded-sm"/>

                    <button type="submit" className="bg-indigo-700 px-5 py-2 text-white font-semibold rounded mt-10">Log In</button>
                </form>
            </div>
        </div>
    );

}


export default Login;