import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/store/store";
import { UrlDataCard } from "@/components";
import { useEffect } from "react";
import { useParams } from "react-router";
import { handleFetchUrlDetails } from "@/handlers";

const Analytics = () => {
    const { urlMetadata, loading, error } = useSelector((state: RootState) => state.urlAnalytics);
    const dispatch = useDispatch<AppDispatch>();
    const { urlId } = useParams();
    useEffect(() => {
        if (urlId) {
            dispatch(handleFetchUrlDetails(urlId));
        }
    }, [dispatch, urlId])

    return (
        <div className="min-h-[94vh] bg-muted">
            <main className="container mx-auto px-8 lg:px-28 py-24">
                <h1 className="text-3xl font-medium tracking-tight">Analytics</h1>
                {loading ? (
                    <p className="text-muted-foreground">Loading analytics...</p>
                ) : (
                    <>
                        <p className="mb-2">URL ID: {urlMetadata.id}</p>
                    </>
                )}

                <UrlDataCard urlMetadata={urlMetadata} loading={loading} error={error} />
            </main>
        </div>
    );
};

export default Analytics;