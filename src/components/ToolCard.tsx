import { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ToolCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  status?: "online" | "offline" | "scanning";
  onLaunch: () => void;
}

const ToolCard = ({ title, description, icon: Icon, status = "online", onLaunch }: ToolCardProps) => {
  const statusColors = {
    online: "bg-secondary",
    offline: "bg-destructive",
    scanning: "bg-accent animate-pulse",
  };

  return (
    <div className="cyber-card group cursor-pointer" onClick={onLaunch}>
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4">
          <div className="p-3 rounded-lg bg-primary/10 border border-primary/30 group-hover:cyber-glow transition-all duration-300">
            <Icon className="w-6 h-6 text-primary" />
          </div>
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${statusColors[status]}`} />
            <span className="text-xs text-muted-foreground capitalize">{status}</span>
          </div>
        </div>
        
        <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
          {title}
        </h3>
        <p className="text-sm text-muted-foreground mb-4">
          {description}
        </p>
        
        <Button variant="cyber" size="sm" className="w-full">
          Launch Tool
        </Button>
      </div>
    </div>
  );
};

export default ToolCard;
