import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Button, Input, Label, Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components";
import { Link, useLocation, useNavigate } from "react-router";
import type { AppDispatch, RootState } from "../store/store";
import { useDispatch, useSelector } from "react-redux";
import { handleLogin } from "../handlers";
import { toast } from "sonner";

const LoginPage = () => {
    const dispatch = useDispatch<AppDispatch>();
    const [username, setUsername] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const location = useLocation();
    const from = location.state?.from?.pathname || "/dashboard";
    const { user, isLoggedIn } = useSelector((state: RootState) => state.auth);

    const firstRender = useRef(true);

    useEffect(() => {
        if (isLoggedIn && user) {
            if (firstRender.current) {
                toast.info("You are already logged in");
                firstRender.current = false;
            }
            navigate(from, { replace: true });
        }
    }, [isLoggedIn, user, navigate, from]);

    useEffect(() => {
        setIsButtonDisabled(
            username.length < 3 || password.length < 8
        );
        setError(null);
    }, [username, password]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const user = await handleLogin(dispatch, { username, password });
            if (user) {
                toast.success("Logged in successfully");
                navigate(from, { replace: true });
            }
        } catch (error) {
            const errorMessage =
                error instanceof Error
                    ? error.message
                    : "Login failed. Please try again.";
            setIsButtonDisabled(true);
            setError(errorMessage);
            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-muted">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <Card className="w-[350px]">
                    <CardHeader>
                        <CardTitle>Log In</CardTitle>
                        <CardDescription>Enter your linkly account details</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit}>
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="username">Username</Label>
                                    <Input
                                        id="username"
                                        type="text"
                                        autoComplete="username"
                                        placeholder="Enter your username"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="password">Password</Label>
                                    <Input
                                        id="password"
                                        type="password"
                                        autoComplete="current-password"
                                        placeholder="Enter your password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>
                            {error && <p className="text-red-500 text-center mt-4">{error}</p>}
                            <Button
                                type="submit"
                                className="w-full mt-6 cursor-pointer disabled:cursor-not-allowed"
                                disabled={loading || isButtonDisabled}
                            >
                                {loading ? "Logging in..." : "Login"}
                            </Button>
                        </form>
                    </CardContent>
                    <CardFooter className="flex justify-center">
                        <p className="text-sm text-muted-foreground">
                            Don't have an account?{" "}
                            <Link to="/signup" className="text-primary hover:underline">
                                Sign up
                            </Link>
                        </p>
                    </CardFooter>
                </Card>
            </motion.div>
        </div>
    );
}

export default LoginPage;