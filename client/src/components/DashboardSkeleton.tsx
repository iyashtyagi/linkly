import { motion } from "framer-motion";

const SkeletonCard = () => (
  <div className="bg-background rounded-xl border shadow-sm p-6 mb-4 animate-pulse">
    <div className="h-6 w-1/4 bg-zinc-300 rounded mb-4" />
    <div className="h-4 w-3/4 bg-zinc-300 rounded mb-2" />
    <div className="h-4 w-1/2 bg-zinc-300 rounded" />
  </div>
);

const DashboardSkeleton = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="space-y-8 min-h-[94vh] px-8 lg:px-28 pt-24"
  >
    <div className="space-y-4 animate-pulse">
      <div className="h-8 w-40 bg-zinc-300 rounded" />
    </div>
    {[...Array(3)].map((_, i) => (
      <SkeletonCard key={i} />
    ))}
  </motion.div>
);

export default DashboardSkeleton;