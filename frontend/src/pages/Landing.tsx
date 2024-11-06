import React from "react";
import { useNavigate } from "react-router-dom";

const Landing : React.FC = () => {
    const navigate = useNavigate();

    return(
        <div className="h-screen w-screen bg-slate-100 flex flex-col justify-center items-center">
            <div className="h-20 w-full p-5 border-b-[4px] border-b-indigo-200">
                <p className="font-bold text-4xl text-indigo-900">Fake forum</p>
            </div>
            <div className="h-full w-3/4 flex items-center justify-center gap-10">
                <div className="w-1/3 h-1/4 bg-indigo-700 flex items-center justify-center rounded-lg hover:scale-[102%] hover:cursor-pointer" onClick={() => navigate('/register')}>
                    <p className="text-white font-bold text-3xl">Register</p>
                </div>
                <div className="w-1/3 h-1/4 bg-indigo-700 flex items-center justify-center rounded-lg hover:scale-[102%] hover:cursor-pointer" onClick={() => navigate('/login')}>
                    <p className="text-white font-bold text-3xl">Login</p>
                </div>
            </div>
            <footer className="bg-indigo-900 h-10 w-full"></footer>
        </div>
    );

}


export default Landing;