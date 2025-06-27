import { motion } from "framer-motion";
import { Globe, PlusCircle } from "lucide-react";
import { Button } from "./ui";
import { useNavigate } from "react-router";

const EmptyDashboard = () => {
    const navigate = useNavigate();
    return (
        <div className="min-h-[94vh]">
            <main className="container mx-auto px-8 lg:px-28 py-24">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-col items-center justify-center space-y-6 text-center"
                >
                    <Globe className="h-16 w-16 text-muted-foreground/60" />
                    <h2 className="text-2xl font-medium">No Links Yet</h2>
                    <p className="text-muted-foreground max-w-md">
                        Create your first short link and start tracking its performance
                    </p>
                    <Button
                        onClick={() => navigate("/")}
                        className="flex items-center gap-2"
                    >
                        <PlusCircle className="h-4 w-4" />
                        Create Your First Link
                    </Button>
                </motion.div>
            </main>
        </div>
    );
};

export default EmptyDashboard;