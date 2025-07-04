import type { LabelCount } from "@/types/linkly-type";
import { ResponsivePie } from "@nivo/pie";
import { getName } from "country-list";
import { PieChart } from "lucide-react";
import type { ColorSchemeId } from "@nivo/colors";
import { motion } from "framer-motion";

const PieChartComponent = ({ data, title, idx }: { data: LabelCount[], title: string, idx: number }) => {
    const isClickType = title.toLocaleLowerCase().includes("type");
    const formattedData = data.map(item => ({
        id: isClickType && item.label === "Other" ? "link" : getName(item.label) || item.label, 
        label: getName(item.label) || item.label,
        value: item.count,
    }));
    const colorsScheme = ['nivo', 'category10', 'dark2', 'paired', 'set2', 'set2'];
    const randomColor = colorsScheme[idx] as ColorSchemeId;
    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            animate={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5 }}
            className="w-full border rounded shadow pt-4"
        >
            <div className="flex gap-2 pl-6 border-b-2 border-dotted">
                <PieChart className="shrink-0"/>
                <h2 className="text-md font-semibold mb-4">{title}</h2>
            </div>
            {!data.length ? (<div className="w-full mx-auto flex justify-center items-center min-h-60 ">No clicks yet</div>) : (<div className="aspect-square min-w-3xs max-w-lg">
                <ResponsivePie
                    data={formattedData}
                    innerRadius={0}
                    padAngle={0}
                    cornerRadius={2}
                    margin={{top:0, right: 60, bottom: 60, left: 60}}
                    activeOuterRadiusOffset={8}
                    colors={{ scheme: randomColor}}
                    borderWidth={1}
                    borderColor={{ from: 'color' }}
                    arcLabelsTextColor='theme'
                    arcLinkLabelsStraightLength={6}
                    arcLinkLabelsDiagonalLength={8}
                    arcLinkLabelsThickness={2}
                    legends={[{
                        anchor: 'bottom',
                        direction: 'row',
                        justify: false,
                        translateX: 15,
                        translateY: 48,
                        itemsSpacing: -15,
                        itemWidth: 80,
                        itemHeight: 16,
                        itemTextColor: '#999',
                        symbolSize: 12,
                    }]}
                />
            </div>)}
                
        </motion.div>
    );
}   

export default PieChartComponent;