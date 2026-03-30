import { motion } from "motion/react";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: number;
  icon: LucideIcon;
  color: "blue" | "green" | "purple" | "orange";
  delay?: number;
  onClick?: () => void;
}

const colorClasses = {
  blue: {
    bg: "from-blue-500 to-blue-600",
    shadow: "shadow-blue-500/30",
    light: "from-blue-50 to-blue-100/50",
  },
  green: {
    bg: "from-green-500 to-green-600",
    shadow: "shadow-green-500/30",
    light: "from-green-50 to-green-100/50",
  },
  purple: {
    bg: "from-purple-500 to-purple-600",
    shadow: "shadow-purple-500/30",
    light: "from-purple-50 to-purple-100/50",
  },
  orange: {
    bg: "from-orange-500 to-orange-600",
    shadow: "shadow-orange-500/30",
    light: "from-orange-50 to-orange-100/50",
  },
};

export default function StatCard({ title, value, icon: Icon, color, delay = 0, onClick }: StatCardProps) {
  const colors = colorClasses[color];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay, ease: "easeOut" }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      onClick={onClick}
      className={`bg-white rounded-2xl p-6 shadow-lg shadow-gray-200/50 border border-gray-100 hover:shadow-xl hover:shadow-gray-200/80 transition-shadow duration-300 ${onClick ? "cursor-pointer" : ""}`}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm text-gray-600 mb-1">{title}</p>
          <p className="text-4xl font-bold text-gray-900">{value}</p>
        </div>
        <div className={`p-3 bg-gradient-to-br ${colors.light} rounded-xl`}>
          <div className={`p-2.5 bg-gradient-to-br ${colors.bg} rounded-lg shadow-lg ${colors.shadow}`}>
            <Icon className="w-5 h-5 text-white" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
