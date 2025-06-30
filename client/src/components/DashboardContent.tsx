import type { Url } from "@/types/linkly-type";
import { motion } from "framer-motion";
import { Input } from "./ui";
import UrlCard from "./UrlCard";

const DashboardContent = ({
    filteredUrls,
    searchTerm,
    setSearchTerm,
    setDeletingUrlId,
    deletingUrlId
}: {
    filteredUrls: Url[];
    searchTerm: string;
    setSearchTerm: (term: string) => void;
    setDeletingUrlId: (id: string | null) => void;
    deletingUrlId: string | null;
}) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-8"
    >
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-medium tracking-tight">Your Links</h1>
                <Input
                    type="search"
                    placeholder="Search links..."
                    className="max-w-xs"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
        </div>
        {filteredUrls.map((url: Url) => (
            <UrlCard
                key={url.id}
                url={url}
                setDeletingUrlId={setDeletingUrlId}
                deletingUrlId={deletingUrlId}
            />
        ))}
    </motion.div>
);

export default DashboardContent;