import { createBrowserRouter, Navigate } from "react-router";
import AppLayout from "../layouts/AppLayout";
import { Analytics, Dashboard, Landing, Login, NotFound, SignUp } from "@/pages";
import { ProtectedRoute } from "@/components";

const router = createBrowserRouter([
    {
        element: <AppLayout />,
        children : [
            {
                path: "/",
                element : <Landing />
            },
            {
                path: "/login",
                element : <Login />
            },
            {
                path: "/signup",
                element : <SignUp />
            },
            {
                element: <ProtectedRoute />,
                children : [
                    { 
                    path: "/dashboard",
                    element : <Dashboard />
                    },
                    {
                        path: "/analytics/",
                        element: <Navigate to="/dashboard" replace />
                    },
                    {
                        path: "/analytics/:urlId",
                        element: <Analytics />
                    }
                ]
            },
            {
                path: "*",
                element: <NotFound />
            }
        ]
    }
]);

export default router;