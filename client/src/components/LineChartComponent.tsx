import type { DateClickCount } from "@/types/linkly-type";
import { Area, AreaChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const LineChartComponent = ({ dataset }: { dataset: DateClickCount[] }) => {
    return (
        <ResponsiveContainer
            width="100%"
            height="100%"
        >
            <AreaChart
                data={dataset}
                margin={{bottom:20}}
                accessibilityLayer={false}
            >
                <defs>
                    <linearGradient id="purpleGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                    </linearGradient>
                </defs>
                <XAxis 
                    dataKey="date"
                    tick={{
                        // @ts-ignore
                        angle: -30,
                        fontSize: 10,
                        textAnchor: "end",
                    }}    
                />
                <YAxis dataKey="count" />
                <CartesianGrid strokeDasharray="2 2" />
                <Area type="monotone" name="Clicks" dataKey="count" stroke="#8884d8" fillOpacity={1} fill="url(#purpleGradient)" />
                <Tooltip />
                <Legend
                    verticalAlign="top"
                    height={36}
                />
            </AreaChart>
        </ResponsiveContainer>
    );
};

export default LineChartComponent;