import { createBrowserRouter } from "react-router";
import AppLayout from "../layouts/AppLayout";
import { Analytics, Dashboard, Landing, Login, SignUp } from "@/pages";

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
                path: "/dashboard",
                element : <Dashboard />
            },
            {
                path: "/analytics/:urlId",
                element: <Analytics />
            }
        ]
    }
]);

export default router;