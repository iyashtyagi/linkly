import { useState } from "react";
import { motion } from "framer-motion";
import { Button, Input } from "./ui";
import { ArrowRight, Loader2 } from "lucide-react";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/store/store";
import { toast } from "sonner";
import { handleShortenUrl } from "@/handlers";

const Hero = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [url, setUrl] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!url) {
            toast.error("Please enter a valid URL");
            return;
        }

        if (!isLoggedIn) {
            toast.info("You need to log in to shorten a URL");
            navigate("/login");
            return;
        }

        try {
            setIsLoading(true);
            const slugId = await dispatch(handleShortenUrl({ url }));
            toast.success("URL shortened successfully!");
            navigate(`/analytics/${slugId}`);
        } catch (error) {
            const errorMessage = error instanceof Error? error.message : "Something went wrong. Please try again.";
            toast.error(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <section className="min-h-[80vh] relative flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-zinc-400 to-white dark:from-zinc-900/50 dark:to-zinc-900" />
            <motion.div
                className="absolute inset-0 opacity-30 dark:opacity-40"
                initial={{ backgroundPosition: "0 0" }}
                animate={{ backgroundPosition: "100% 100%" }}
                transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }}
                style={{
                    backgroundImage:
                        "radial-gradient(circle at center, transparent 0%, transparent 50%, currentColor 100%)",
                    backgroundSize: "50% 50%",
                }}
            />
            <div className="container relative mx-auto px-8">
                <motion.div
                    className="max-w-4xl mx-auto text-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <motion.h1
                        className="text-4xl sm:text-5xl md:text-6xl font-medium tracking-tighter mb-8 relative inline-block"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        Create Links! Shorter
                    </motion.h1>
                    <motion.form
                        onSubmit={handleSubmit}
                        className="relative max-w-2xl mx-auto"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                    >
                        <div className="group relative">
                            <div className="absolute -inset-1 bg-gradient-to-r from-zinc-200 via-zinc-300 to-zinc-200 dark:from-zinc-700 dark:via-zinc-600 dark:to-zinc-700 rounded-full blur-md opacity-60 transition duration-1000 group-hover:opacity-100" />
                            <div className="relative flex gap-2 bg-background rounded-full p-2 shadow-lg">
                                <Input
                                    type="url"
                                    placeholder="Paste your long URL"
                                    value={url}
                                    onChange={(e) => setUrl(e.target.value)}
                                    className="h-12 px-6 rounded-full border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-muted-foreground/60"
                                />
                                <Button
                                    type="submit"
                                    size="icon"
                                    className="h-12 w-12 rounded-full shrink-0 transition-transform group-hover:scale-105"
                                    disabled={isLoading}
                                >
                                    {isLoading ? (
                                        <Loader2 className="h-5 w-5 animate-spin" />
                                    ) : (
                                        <ArrowRight className="h-5 w-5" />
                                    )}
                                </Button>
                            </div>
                        </div>
                        <p className="mt-4 text-sm text-muted-foreground/80">
                            Transform your links into powerful insights • Track • Analyze •
                            Grow
                        </p>
                    </motion.form>
                </motion.div>
            </div>
        </section>
    );
}

export default Hero;