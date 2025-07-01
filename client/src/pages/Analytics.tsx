import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/store/store";
import { UrlDataCard } from "@/components";
import { useEffect } from "react";
import { useParams } from "react-router";
import { handleFetchUrlDetails } from "@/handlers";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui";
import { ChartColumn } from "lucide-react";
import PieChartComponent from "@/components/PieChartComponent";
import { motion } from "framer-motion";
import SomethingWentWrong from "@/components/SomethingWentWrong";
import AnalyticsSkeleton from "@/components/AnalyticsSkeleton";

const Analytics = () => {
    const { urlMetadata, lastClickDetails, analytics, loading, error } = useSelector((state: RootState) => state.urlAnalytics);
    const dispatch = useDispatch<AppDispatch>();
    const { urlId } = useParams();
    useEffect(() => {
        if (urlId) {
            dispatch(handleFetchUrlDetails(urlId));
        }
    }, [dispatch, urlId]);

    const chartItems = [
        { data: analytics.byCountry, title: "Clicks by Country" },
        { data: analytics.byState, title: "Clicks by State" },
        { data: analytics.byCity, title: "Clicks by City" },
        { data: analytics.byDevice, title: "Clicks by Device" },
        { data: analytics.byOS, title: "Clicks by OS" },
        { data: analytics.byClickType, title: "Clicks by Click Type" },
    ];

    if(error){
        return (
            <SomethingWentWrong error={error}/>
        );
    };

    if(loading){
        return (
            <AnalyticsSkeleton />
        );
    }

    return (
        <motion.div 
            initial={{opacity: 0, y:20}}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="min-h-[94vh]"
        >
            <main className="container mx-auto px-8 lg:px-28 pt-24 pb-8">
                <h1 className="text-3xl font-medium tracking-tight">Analytics</h1>
                    <>
                        <p className="mb-2">URL ID: {urlMetadata.id}</p>
                    </>
                <UrlDataCard urlMetadata={urlMetadata} lastClickDetails={lastClickDetails} analytics={analytics} loading={loading} />

                <Card className="mt-8">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <ChartColumn className=" shrink-0" />
                            <span className="pt-1 text-xl lg:text-4xl">Click Analytics</span>
                        </CardTitle>
                    </CardHeader>

                    <CardContent className="grid gap-6 sm:gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 px-0 lg:px-4">
                        {chartItems.map((chart, index) => (
                            <div
                                key={index}
                                className="px-4 lg:px-2"
                            >
                                <PieChartComponent data={chart.data} title={chart.title} idx={index} />
                            </div>
                        ))}
                    </CardContent>

                </Card>

            </main>
        </motion.div>
    );
};

export default Analytics;