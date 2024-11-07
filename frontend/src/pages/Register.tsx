import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Register : React.FC = () => {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [secure, setSecure] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (src : "username" | "password" | "email", e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        src === "username" ? setUsername(value) : src === "password" ? setPassword(value) : src === "email" ? setEmail(value) : console.error("An error occured.");
    }

    const handleRegister = async (e : React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        if(!username || !password || !email) {
            setError("Please fill all the fields.");
            return;
        }

        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/auth/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, password, email, secure }),
            });

            const data = await response.json();

            if (!response.ok) {
                toast.error(data.message);
                return;
            }

            setLoading(false);
            navigate("/login");

        } catch (error: any) {
            setLoading(false);
            setError(error.message || "An error occurred during registration.");
        }
    }

    const handleCheck = () => {
        setSecure((prev) => !prev);
    };

    return(
        <div className="h-screen w-screen flex flex-col items-center justify-center bg-slate-100">
            <div className="h-1/2 w-2/3 sm:w-3/5 md:w-2/5 lg:w-1/3 xl:w-1/4 flex flex-col items-center py-10 bg-white shadow-lg">
                <h1 className="font-bold text-4xl text-indigo-900">Register</h1>

                {error && <p className="text-red-600 mt-5">{error}</p>} 

                <form onSubmit={(e) => handleRegister(e)} className="h-full w-full flex flex-col items-center justify-center">
                    <input type="text" name="email" value={email} placeholder="Email" onChange={(e) => handleChange("email", e)} className="w-3/5 p-2 rounded-sm bg-indigo-100 border-indigo-900 border-2"/>
                    
                    <input type="text" name="username" value={username} placeholder="Username" onChange={(e) => handleChange("username", e)} className="w-3/5 p-2 mt-3 rounded-sm bg-indigo-100 border-indigo-900 border-2"/>
                    
                    <input type="password" name="password" value={password} placeholder="Password" onChange={(e) => handleChange("password", e)} className="w-3/5 p-2 mt-3 rounded-sm bg-indigo-100 border-indigo-900 border-2"/>

                    <div className="flex gap-2 justify-center items-center mt-3">
                        <input type="checkbox" name="secure" checked={!secure} onChange={handleCheck} className="h-5 w-5 accent-indigo-600"/>
                        <label>Sensitive data exposure vulnerability {secure ? "disabled" : "enabled"}</label>
                    </div>

                    {loading && (
                        <div className="flex justify-center mt-4">
                            <div className="w-8 h-8 border-4 border-t-4 border-gray-200 border-t-indigo-500 rounded-full animate-spin"></div>
                        </div>
                    )}

                    <button type="submit" className="bg-indigo-700 px-5 py-2 text-white font-semibold rounded mt-10">Register</button>
                </form>
            </div>

            <ToastContainer
                position="bottom-right"
                autoClose={2000}
                limit={2}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </div>
    );

}


export default Register;