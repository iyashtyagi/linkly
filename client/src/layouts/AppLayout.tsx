import { Outlet } from "react-router";
import { Footer, Header } from "../components";

const AppLayout = () => {
    return (
        <div>
            <Header />
            <main className="mt-18">
                <Outlet />
            </main>

            <Footer />
        </div>
    );
};

export default AppLayout;