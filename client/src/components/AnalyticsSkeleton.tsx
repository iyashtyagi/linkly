import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui";

const AnalyticsSkeleton = () => (
    <div className="min-h-[94vh] animate-pulse">
        <main className="container mx-auto px-8 lg:px-28 pt-24 pb-8">
            <div className="h-10 w-56 bg-muted rounded mb-2" />
            <div className="h-10 w-56 bg-muted rounded mb-4" />
            <Card>
                <CardHeader>
                    <div className="h-10 w-48 bg-muted rounded mb-8" />
                </CardHeader>
                <CardContent>
                    <div className="mb-6">
                        <div className="h-6 w-32 bg-muted rounded mb-2" />
                    </div>
                    <div className="grid gap-4 md:grid-cols-2"> 
                        <div className="h-40 w-full bg-muted rounded" />
                        <div className="h-40 w-full bg-muted rounded" />
                    </div>
                </CardContent>
            </Card>

            <Card className="mt-8">
                <CardHeader className=" border-b-2 border-dotted">
                    <CardTitle className="flex items-center gap-2">
                        <div className="shrink-0 h-8 w-8 bg-muted rounded" />
                        <div className="h-8 w-40 bg-muted rounded block" />
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="w-full h-[300px] md:h-[500px] bg-muted rounded" />
                </CardContent>
            </Card>

            <Card className="mt-8">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <div className="shrink-0 h-8 w-8 bg-muted rounded" />
                        <span className="h-8 w-40 bg-muted rounded block" />
                    </CardTitle>
                </CardHeader>
                <CardContent className="grid gap-6 sm:gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 px-2 lg:px-4">
                    {[...Array(6)].map((_, i) => (
                        <div key={i} className="px-4 lg:px-2">
                            <div className="h-6 w-32 bg-muted rounded mb-4" />
                            <div className="h-40 w-full bg-muted rounded" />
                        </div>
                    ))}
                </CardContent>
            </Card>
        </main>
    </div>
);

export default AnalyticsSkeleton;