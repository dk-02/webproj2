import { Navigate, Outlet } from "react-router-dom";
import { useState, useEffect } from "react";


const ProtectedRoute: React.FC = () => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/auth/check`, {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ` + localStorage.getItem("accessToken"),
                    },
                });
                const data = await response.json();
                setIsAuthenticated(data.status);
            } catch (error) {
                setIsAuthenticated(false);
                console.error("Error checking authentication:", error);
            }
        };

        checkAuth();
    }, []);

    if (isAuthenticated === null) return null;

    return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
