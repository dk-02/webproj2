import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";

const Header : React.FC = () => {
    const navigate = useNavigate(); 
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>();

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/auth/check`, {
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
                {isAuthenticated && <button onClick={handleLogout} className="font-bold text-2xl">Log out</button>}                
            </div>
        </header>
    )
}

export default Header;