import { useEffect, useRef, useState } from "react";
import type { FormEvent } from "react";
import { motion } from "framer-motion";
import { Button, Input, Label, Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components";
import { Link, useLocation, useNavigate } from "react-router";
import { handleSignup } from "../handlers";
import { toast } from "sonner";
import type { RootState } from "@/store/store";
import { useSelector } from "react-redux";

const SignupPage = () => {
    
    const [username, setUsername] = useState<string>("");
    const [firstName, setFirstName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const location = useLocation();
    const from = location.state?.from?.pathname || "/dashboard";
    const { user, isLoggedIn } = useSelector((state: RootState) => state.auth); 
    const navigate = useNavigate();

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
            username.length < 3 || password.length < 8 || firstName.length < 2 || lastName.length < 2
        );
        setError(null);
    }, [username, password, firstName, lastName]);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        if (password.length < 8) {
            setError("Password must be at least 8 characters long");
            setLoading(false);
            return;
        }
        try {
            await handleSignup({ firstName, lastName, username, password });
            toast.success("Account created successfully! Please login.");
            navigate("/login");
        } catch (error) {
            const errorMessage =
                error instanceof Error
                    ? error.message
                    : "Signup failed. Please try again.";
            setError(errorMessage);
            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-background">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <Card className="w-[350px]">
                    <CardHeader>
                        <CardTitle>Sign Up</CardTitle>
                        <CardDescription>Create your linkly account</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit}>
                            <div className="space-y-4">
                                <div className="space-y-1">
                                    <Label htmlFor="firstName">First name</Label>
                                    <Input
                                        id="firstName"
                                        type="text"
                                        placeholder="Enter your first name"
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}
                                        required
                                        minLength={2}
                                    />
                                </div>
                                <div className="space-y-1">
                                    <Label htmlFor="lastName">Last name</Label>
                                    <Input
                                        id="lastName"
                                        type="text"
                                        placeholder="Enter your last name"
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)}
                                        required
                                        minLength={2}
                                    />
                                </div>
                                <div className="space-y-1">
                                    <Label htmlFor="username">username</Label>
                                    <Input
                                        id="username"
                                        type="text"
                                        placeholder="Enter your username"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="space-y-1">
                                    <Label htmlFor="password">Password</Label>
                                    <Input
                                        id="password"
                                        type="password"
                                        placeholder="Enter your password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        minLength={6}
                                    />
                                </div>
                                {error && <p className="text-sm text-red-500 mt-2">{error}</p>}
                            </div>
                            <Button
                                type="submit"
                                className="w-full mt-6"
                                disabled={loading || isButtonDisabled} 
                            >
                                {loading ? "Signing up..." : "Sign Up"}
                            </Button>
                        </form>
                    </CardContent>
                    <CardFooter className="flex justify-center">
                        <p className="text-sm text-muted-foreground">
                            Already have an account?{" "}
                            <Link to="/login" className="text-primary hover:underline">
                                Log in
                            </Link>
                        </p>
                    </CardFooter>
                </Card>
            </motion.div>
        </div>
    );
}

export default SignupPage;