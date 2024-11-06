import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


const Login : React.FC = () => {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleChange = (src : "username" | "password", e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        src === "username" ? setUsername(value) : src === "password" ? setPassword(value) : console.error("An error occured.");

    }


    const handleLogin = async (e : React.FormEvent) => {
        e.preventDefault();
        setError(null);

        if(!username || !password) {
            setError("Please enter both username and password.");
            return;
        }

        try {
            const response = await fetch("http://localhost:5000/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, password }),
            });

            if (!response.ok) {
                throw new Error("Login failed. Please check your credentials.");
            }

            const data = await response.json();
            localStorage.setItem("accessToken", data.token);

            navigate("/home");

        } catch (error: any) {
            setError(error.message || "An error occurred during login.");
        }
        
    }
    

    return(
        <div className="h-screen w-screen flex flex-col items-center justify-center bg-slate-100">
            <div className="h-1/2 w-2/3 sm:w-3/5 md:w-2/5 lg:w-1/3 xl:w-1/4 flex flex-col items-center py-10 bg-white shadow-lg">
                <h1 className="font-bold text-4xl text-indigo-900">Login</h1>

                {error && <p className="text-red-600 mt-5">{error}</p>} 

                <form onSubmit={(e) => handleLogin(e)} className="h-full w-full flex flex-col items-center justify-center">
                    <input type="text" name="username" value={username} placeholder="Username" onChange={(e) => handleChange("username", e)} className="w-3/5 p-2 rounded-sm bg-slate-100 border-indigo-900 border-2"/>
                    <input type="password" name="password" value={password} placeholder="Password" onChange={(e) => handleChange("password", e)} className="w-3/5 p-2 mt-3 rounded-sm bg-slate-100 border-indigo-900 border-2"/>

                    <button type="submit" className="bg-indigo-700 px-5 py-2 text-white font-semibold rounded mt-10">Log In</button>
                </form>
            </div>
        </div>
        
    );

}


export default Login;