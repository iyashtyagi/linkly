import { createBrowserRouter } from "react-router";
import AppLayout from "../layouts/AppLayout";
import { Analytics, Auth, Dashboard, Landing } from "../pages";

const router = createBrowserRouter([
    {
        element: <AppLayout />,
        children : [
            {
                path: "/",
                element : <Landing />
            },
            {
                path: "/auth",
                element : <Auth />
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