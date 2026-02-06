import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: "up" | "down" | "neutral";
  trendValue?: string;
}

const StatCard = ({ title, value, icon: Icon, trend = "neutral", trendValue }: StatCardProps) => {
  const trendColors = {
    up: "text-secondary",
    down: "text-destructive",
    neutral: "text-muted-foreground",
  };

  return (
    <div className="cyber-card">
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-3">
          <Icon className="w-5 h-5 text-primary" />
          {trendValue && (
            <span className={`text-xs font-medium ${trendColors[trend]}`}>
              {trend === "up" ? "↑" : trend === "down" ? "↓" : "→"} {trendValue}
            </span>
          )}
        </div>
        <p className="text-2xl font-bold terminal-text mb-1">{value}</p>
        <p className="text-sm text-muted-foreground">{title}</p>
      </div>
    </div>
  );
};

export default StatCard;
