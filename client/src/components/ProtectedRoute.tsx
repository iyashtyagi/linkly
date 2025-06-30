import type { RootState } from "@/store/store"
import { useSelector } from "react-redux"
import { Navigate, Outlet, useLocation } from "react-router";

const ProtectedRoute = () => {
    const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
    const location = useLocation();

    if(!isLoggedIn){
        return <Navigate to='/login' state={{ from: location.pathname }} replace />;
    }
    return (
        <Outlet />
    );
};

export default ProtectedRoute;