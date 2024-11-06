import { Navigate, Outlet } from "react-router-dom";

interface PrivateRouteProps {
    isAuthenticated: boolean | null;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ isAuthenticated }) => {
    if (isAuthenticated === null) return null;
    return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
