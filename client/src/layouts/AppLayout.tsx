import { Outlet } from "react-router";
import { Footer, Header } from "@/components";

const AppLayout = () => {
    return (
        <div>
            <Header />
            <main>
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

export default AppLayout;