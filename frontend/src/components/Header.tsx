import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";

const Header : React.FC = () => {
    const navigate = useNavigate(); 
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>();

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await fetch("http://localhost:5000/auth/check", {
                    method: "GET",
                    headers: {
                        "Authorization" : `Bearer ` + localStorage.getItem("accessToken")
                    }
                });

                const data = await response.json();
                setIsAuthenticated(data.status);

            } catch (err) {
                console.error(err);
            }
        };

        checkAuth();
    }, []);

    

    const handleLogout = () => {
        localStorage.removeItem("accessToken");
        navigate("/login");
    };

    return(
        <header className="h-20 w-full flex justify-between bg-indigo-700 items-center text-white px-5">
            <div>
                <h2 className="font-bold text-2xl">Fake forum</h2>
            </div>
            <div>
                {isAuthenticated && <button onClick={handleLogout}>Log out</button>}                
            </div>
        </header>
    )
}

export default Header;