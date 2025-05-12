import { RouterProvider } from "react-router";
import router from "./router";

function App() {
    return (
        <div className="font-mono">
            <RouterProvider router={router} />
        </div>
    );
};

export default App;