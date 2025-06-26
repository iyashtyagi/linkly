import { RouterProvider } from "react-router";
import router from "./router";
import { Toaster } from "sonner";

function App() {
    return (
        <div className="font-mono">
            <Toaster />
            <RouterProvider router={router} />
        </div>
    );
};

export default App;