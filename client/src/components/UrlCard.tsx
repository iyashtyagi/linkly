import { motion } from "framer-motion";
import { Button, Card, CardContent, CardHeader, CardTitle } from "./ui";
import { Copy, ExternalLink, Globe, Link, Loader2, Trash2 } from "lucide-react";
import type { Url } from "@/types/linkly-type";
import { useNavigate } from "react-router";

const UrlCard = ({
    url,
    handleCopy,
    setDeletingUrlId,
    deletingUrlId
}: {
    url: Url;
    handleCopy: (url: string) => void;
    setDeletingUrlId: (id: string | null) => void;
    deletingUrlId: string | null;
}) => {
    const navigate = useNavigate();
    return <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
    >
        <Card onClick={() => navigate(`/analytics/${url.id}`)} className="hover:cursor-pointer transition-transform hover:scale-101 hover:shadow-2xl">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xl font-medium">
                    <div className="flex items-center gap-2">
                        <Globe className="h-4 w-4 text-muted-foreground" />
                        {url.slug}
                    </div>
                </CardTitle>
                <div className="flex items-center gap-2">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={(e) => {e.stopPropagation(); handleCopy(url.slug);}}
                        title="Copy URL"
                        className="hover:cursor-pointer"
                    >
                        <Copy className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={(e) => {e.stopPropagation(); window.open(`${window.location.origin}/${url.slug}`)}}
                        title="Open URL"
                        className="hover:cursor-pointer"
                    >
                        <ExternalLink className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={(e) => {e.stopPropagation(); 
                            setDeletingUrlId(url.id);
                        }}
                        title="Delete URL"
                        className="text-red-500 hover:text-red-600 hover:cursor-pointer"
                    >
                        {deletingUrlId === url.id  ? <Loader2 className="h-4 w-4 animate-spin"/> : <Trash2 className="h-4 w-4" />}
                    </Button>
                </div>
            </CardHeader>
            <CardContent>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Link className="h-4 w-4" />
                    <span className="break-words max-w-full">{url.url}</span>
                </div>
            </CardContent>
        </Card>
    </motion.div>
};

export default UrlCard;