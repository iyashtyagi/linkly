import { RouterProvider } from "react-router";
import router from "./router";
import { Toaster } from "sonner";
import { useEffect } from "react";
import { handleVerifyUser } from "./handlers";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "./store/store";

function App() {
    const dispatch = useDispatch<AppDispatch>();
    useEffect(()=>{
        dispatch(handleVerifyUser());
    }, []);
    return (
        <div className="font-mono">
            <Toaster />
            <RouterProvider router={router} />
        </div>
    );
};

export default App;