import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import type { AppDispatch, RootState } from "@/store/store";
import type { Url } from "@/types/linkly-type";
import { handleDeleteUrl, handleFetchUrls} from "@/handlers";
import { DeleteUrlDialog, EmptyDashboard, DashboardContent } from "@/components";
import DashboardSkeleton from "@/components/DashboardSkeleton";

const Dashboard = () => {
    const dispatch = useDispatch<AppDispatch>();
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [deletingUrlId, setDeletingUrlId] = useState<string | null>(null);
    const { urls, loading, error } = useSelector((state: RootState) => state.urls);

    useEffect(() => {
        (async () => {
            try {
                await dispatch(handleFetchUrls());
            } catch (error) {
                toast.error(error instanceof Error ? error.message : "Failed to fetch URLs")
            }
        })();
    }, [dispatch]);

    const filteredUrls = urls.filter((url: Url) =>
        [ url.url, url.slug].some((field) => field?.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    const handleDelete = async () => {
        if (deletingUrlId) {
            try {
                await dispatch(handleDeleteUrl(deletingUrlId));
                toast.success("URL deleted!")
            } finally {
                setDeletingUrlId(null);
            }
        }
    };

    if (loading) {
        return <DashboardSkeleton />;
    }

    if (error) {
        return <ErrorView error={error} />;
    }

    if (!urls.length) {
        return <EmptyDashboard />;
    }

    return (
        <div className="min-h-[94vh] bg-muted">
            <main className="container mx-auto px-8 lg:px-28 py-24">
                <DashboardContent
                    filteredUrls={filteredUrls}
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    setDeletingUrlId={setDeletingUrlId}
                    deletingUrlId={deletingUrlId}
                />
                <DeleteUrlDialog
                    isOpen={deletingUrlId !== null}
                    onClose={() => setDeletingUrlId(null)}
                    onDelete={handleDelete}
                />
            </main>
        </div>
    );
}

const ErrorView = ({ error }: { error: string }) => (
    <div className="flex items-center justify-center min-h-screen text-red-500">
        {error}
    </div>
);

export default Dashboard;