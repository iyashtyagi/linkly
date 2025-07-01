import { motion } from "framer-motion";
import { Button, Card, CardContent, CardHeader, CardTitle } from "./ui";
import { Copy, Download, ExternalLink, Globe, Link, Loader2, MousePointerClick, QrCode, Trash2 } from "lucide-react";
import { handleCopy } from "@/utils";
import type { AnalyticsState } from "@/types/linkly-type";
import { useState } from "react";
import DeleteUrlDialog from "./DeleteUrlDialog";
import { handleDeleteUrl } from "@/handlers";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "@/store/store";
import { toast } from "sonner";
import { useNavigate } from "react-router";
import QrCodeCard from "./QrCodeCard";
import { getName } from "country-list";

const UrlDataCard = ({ urlMetadata, lastClickDetails, analytics }: Omit<AnalyticsState, "error">) => {
    const [deletingUrlId, setDeletingUrlId] = useState<string | null>(null);
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const stats = [
        { 
            label: "Total Clicks",
            value: urlMetadata.totalClicks || "Not clicks yet",
        },
        {
            label: "Latest Click",
            value: lastClickDetails.length ? `${new Date(lastClickDetails[0].createdAt).toLocaleString()} IST` : "No clicks yet",
        },
        {
            label: "Top Country",
            value: urlMetadata.totalClicks && analytics.byCountry.length ? getName(analytics.byCountry[0].label) : "N/A",
        },
        {
            label: "Top State",
            value: urlMetadata.totalClicks && analytics.byState.length ? analytics.byState[0].label : "N/A",
        },
        {
            label: "Top City",
            value: urlMetadata.totalClicks && analytics.byCity.length ? analytics.byCity[0].label : "N/A",
        },
        {
            label: "Top Device",
            value: urlMetadata.totalClicks && analytics.byDevice.length ? analytics.byDevice[0].label : "N/A",  
        },
        {
            label: "Top OS",
            value: urlMetadata.totalClicks && analytics.byOS.length ? analytics.byOS[0].label : "N/A",
        },
        {
            label: "URL Created At",
            value: new Date(urlMetadata.createdAt).toLocaleString() + " IST",
        },
    ];

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
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, x: 0 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
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
                            <QrCode className="h-4 w-4 shrink-0" />
                            <span>Qr Code</span>
                        </CardTitle>
                        <CardContent className="max-w-56 mx-auto">
                            <QrCodeCard slug={urlMetadata.slug} />
                            <Button
                                className="mt-4 w-full hover:cursor-pointer"
                                title="Download QR code"
                                onClick={handleDownloadQrCode}
                            >
                                <Download className="shrink-0"/>
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

                        <CardContent className="text-md font-sans font-normal">
                            <ul className="space-y-2 list-none">
                                {stats.map((stat) => (
                                <li
                                    key={stat.label}
                                    className="flex justify-between items-start border-b pb-1 last:border-b-0"
                                >
                                    <span className="text-muted-foreground">{stat.label}:</span>
                                    <span className="font-bold text-right">{stat.value}</span>
                                </li>
                                ))}
                            </ul>
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