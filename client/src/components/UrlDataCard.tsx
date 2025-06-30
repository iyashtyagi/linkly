// @ts-nocheck
import { motion } from "framer-motion";
import { Button, Card, CardContent, CardHeader, CardTitle } from "./ui";
import { Copy, Download, ExternalLink, Globe, Link, Loader2, MousePointerClick, QrCode, Trash2 } from "lucide-react";
import { handleCopy } from "@/utils";
import type { UrlAnalytics } from "@/types/linkly-type";
import { useState } from "react";
import DeleteUrlDialog from "./DeleteUrlDialog";
import { handleDeleteUrl } from "@/handlers";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "@/store/store";
import { toast } from "sonner";
import { useNavigate } from "react-router";
import QrCodeCard from "./QrCodeCard";


const UrlDataCard = ({ urlMetadata, loading, error }: UrlAnalytics) => {
    const [deletingUrlId, setDeletingUrlId] = useState<string | null>(null);
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const handleDelete = async () => {
        if (deletingUrlId) {
            try {
                await dispatch(handleDeleteUrl(deletingUrlId));
                toast.success("URL deleted!");
                navigate("/dashboard");
            } catch (err) {
                toast.error(err instanceof Error ? err.message : "Something went wrong!");
            } finally {
                setDeletingUrlId(null);
            }
        }
    };

    const handleDownloadQrCode = () => {
        const svg = document.getElementById(`qr-svg-${urlMetadata.slug}`);
        if (!svg) {
            toast.error("QR code not found!");
            return;
        }
        const serializer = new XMLSerializer();
        const svgString = serializer.serializeToString(svg);

        const canvas = document.createElement("canvas");
        canvas.width = 256;
        canvas.height = 256;
        const ctx = canvas.getContext("2d");
        if (!ctx) {
            toast.error("Failed to create canvas for QR code download.");
            return;
        }
        const img = new Image();
        img.onload = () => {
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            const pngUrl = canvas.toDataURL("image/png");
            const link = document.createElement("a");
            link.href = pngUrl;
            link.download = `${urlMetadata.slug}-qr-code.png`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        };
        img.src = `data:image/svg+xml;base64,${btoa(svgString)}`;
    }

    return (
        !loading && <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
        >
            <Card>
                <CardHeader className="md:flex md:flex-row items-baseline justify-between">
                    <CardTitle className="text-xl font-medium">
                        <div className="flex items-baseline md:items-center gap-2">
                            <Globe className="h-4 w-4 text-muted-foreground shrink-0" />
                            <div className="break-all">
                                <span>Slug: <span className="text-sm bg-muted border py-1 px-2 rounded-lg hover:cursor-pointer" onClick={() => handleCopy(urlMetadata.slug)}>{`${window.location.origin}/${urlMetadata.slug}`}</span></span>
                            </div>
                        </div>
                        <div className="flex items-baseline md:items-center gap-2 mt-4">
                            <Link className="h-4 w-4 text-muted-foreground shrink-0" />
                            <div className="break-all">
                                <span>Original URL: <span className="text-sm bg-muted border py-1 px-2 rounded-lg">{urlMetadata.url}</span></span>
                            </div>
                        </div>
                    </CardTitle>
                    <div className="flex items-center pl-4 gap-2">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={(e) => { e.stopPropagation(); handleCopy(urlMetadata.slug); }}
                            title="Copy URL"
                            className="hover:cursor-pointer"
                        >
                            <Copy className="h-4 w-4" />
                        </Button>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={(e) => { e.stopPropagation(); window.open(`${window.location.origin}/${urlMetadata.slug}`) }}
                            title="Open URL"
                            className="hover:cursor-pointer"
                        >
                            <ExternalLink className="h-4 w-4" />
                        </Button>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={(e) => {
                                e.stopPropagation();
                                setDeletingUrlId(urlMetadata.id);
                            }}
                            title="Delete URL"
                            className="text-red-500 hover:text-red-600 hover:cursor-pointer"
                        >
                            {deletingUrlId === urlMetadata.id ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
                        </Button>
                    </div>
                </CardHeader>

                <CardContent className="grid w-full sm:gap-2 gap-6 sm:grid-cols-2 justify-center">
                    <Card className="gap-4 border p-4 rounded">
                        <CardTitle className="flex items-center gap-2" >
                            <QrCode />
                            <span>Qr Code</span>
                        </CardTitle>
                        <CardContent className="max-w-56 mx-auto">
                            <QrCodeCard slug={urlMetadata.slug} />
                            <Button
                                className="mt-4 w-full hover:cursor-pointer "
                                title="Download QR code"
                                onClick={handleDownloadQrCode}
                            >
                                <Download />
                                <span>
                                    Download QR Code
                                </span>
                            </Button>
                        </CardContent>
                    </Card>
                    <Card className="flex flex-col gap-4 border p-4 rounded">
                        <CardTitle className="flex items-center gap-2">
                            <MousePointerClick className="h-4 w-4" />
                            <span>Analytics Summary</span>
                        </CardTitle>
                        <CardContent className=" font-normal">
                            <div>
                                <span>Total Clicks: <span className="font-bold">{urlMetadata.totalClicks}</span></span>
                            </div>
                            <div>
                                <span>Latest Click: <span className="font-bold">{urlMetadata.clicksData && urlMetadata.clicksData.length ? new Date(urlMetadata.clicksData[0].createdAt).toLocaleString() : "No clicks yet"}</span></span>
                            </div>
                            <div>
                                <span>Created at: <span className="font-bold">{new Date(urlMetadata.createdAt).toLocaleString()}</span></span>
                            </div>
                        </CardContent>
                    </Card>
                </CardContent>
            </Card>
            <DeleteUrlDialog
                isOpen={!!deletingUrlId}
                onClose={() => setDeletingUrlId(null)}
                onDelete={handleDelete}
            />
        </motion.div>
    );
};

export default UrlDataCard;