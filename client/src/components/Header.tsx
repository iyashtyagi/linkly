import { motion } from "framer-motion";
import { Button, Avatar, AvatarFallback, AvatarImage, DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui";
import { Link, useLocation, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/store/store";
import { toast } from "sonner";
import { useCallback } from "react";
import type { User } from "@/types/linkly-type";
import { handleLogout } from "@/handlers";
import { linklyLogo } from "@/assets";

const Header = () => {
    const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
    const user = useSelector(
        (state: RootState) => state.auth.user
    ) as User | null;
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const location = useLocation();

    const handleLogoutFnc = async (): Promise<void> => {
        try {
            await dispatch(handleLogout());
            navigate("/");
            toast.success('Logged out successfully')
        } catch (error) {
            const errorMessage =
                error instanceof Error ? error.message : "Logout failed";
            toast.error(errorMessage);
        }
    };

    const getInitials = useCallback(() => {
        if (!user || !user.firstName || !user.lastName) {
            dispatch(handleLogout());
            toast.error("User information is incomplete. Please log in again.");
            navigate("/login");
            return "";
        }
        const initials = user.firstName.charAt(0).toUpperCase() + user.lastName.charAt(0).toUpperCase();
        return initials;
    }, [user, dispatch, navigate]);

    const isAuthPage = location.pathname === "/login" || location.pathname === "/signup";

    return (
        <motion.header
            className="fixed top-0 left-0 right-0 z-50 bg-background/30 backdrop-blur-sm border-b"
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="container mx-auto px-8 lg:px-28 h-16 flex items-center justify-between">
                <Link to="/" className="flex items-center space-x-2">
                    <img src={linklyLogo} alt="Linkly Logo" className="h-6 w-auto" />
                    <span className="text-xl font-bold tracking-tighter">Linkly</span>
                </Link>
                <nav className="flex items-center space-x-6">
                    {isLoggedIn ? (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Avatar className="cursor-pointer shadow-sm border">
                                    <AvatarImage alt={user?.username || user?.username || "User"} />
                                    <AvatarFallback>{getInitials()}</AvatarFallback>
                                </Avatar>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuItem asChild>
                                    <Link to="/dashboard" className="w-full cursor-pointer">
                                        Dashboard
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={handleLogoutFnc} className="cursor-pointer">
                                    Logout
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    ) : (
                        !isAuthPage && (
                            <Button variant="default" size="sm" asChild>
                                <Link to="/login" className="py-5">Log in / Sign up</Link>
                            </Button>
                        )
                    )}
                </nav>
            </div>
        </motion.header>
    );
}

export default Header;