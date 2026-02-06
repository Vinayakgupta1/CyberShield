import { useState } from "react";
import Navbar from "@/components/Navbar";
import StatCard from "@/components/StatCard";
import ToolCard from "@/components/ToolCard";
import ScannerModal from "@/components/ScannerModal";
import { 
  Shield, AlertTriangle, CheckCircle, Clock, 
  Globe, Wifi, Smartphone, Monitor, Activity,
  TrendingUp, Target, Eye
} from "lucide-react";

const Dashboard = () => {
  const [activeModal, setActiveModal] = useState<string | null>(null);

  const stats = [
    { title: "Total Scans", value: "1,247", icon: Target, trend: "up" as const, trendValue: "+12%" },
    { title: "Critical Issues", value: "23", icon: AlertTriangle, trend: "down" as const, trendValue: "-5%" },
    { title: "Systems Secured", value: "156", icon: Shield, trend: "up" as const, trendValue: "+8%" },
    { title: "Active Monitors", value: "42", icon: Eye, trend: "neutral" as const, trendValue: "0%" },
  ];

  const tools = [
    {
      id: "web",
      title: "Web Vulnerability Scanner",
      description: "Scan websites for XSS, SQL injection, CSRF, and more",
      icon: Globe,
      status: "online" as const,
    },
    {
      id: "network",
      title: "Network Scanner",
      description: "Port scanning, service detection, and network mapping",
      icon: Wifi,
      status: "online" as const,
    },
    {
      id: "apk",
      title: "APK Analyzer",
      description: "Analyze Android applications for security flaws",
      icon: Smartphone,
      status: "online" as const,
    },
    {
      id: "windows",
      title: "Windows Security",
      description: "System hardening and Windows vulnerability assessment",
      icon: Monitor,
      status: "scanning" as const,
    },
  ];

  const recentActivity = [
    { type: "scan", target: "example.com", status: "completed", time: "2 min ago", findings: 3 },
    { type: "scan", target: "192.168.1.0/24", status: "completed", time: "15 min ago", findings: 12 },
    { type: "analysis", target: "app-release.apk", status: "completed", time: "1 hour ago", findings: 5 },
    { type: "scan", target: "DC-SERVER-01", status: "in-progress", time: "Running...", findings: 0 },
  ];

  const getModalConfig = (id: string) => {
    switch (id) {
      case "web":
        return { title: "Web Vulnerability Scanner", inputLabel: "Target URL", inputPlaceholder: "https://example.com" };
      case "network":
        return { title: "Network Scanner", inputLabel: "Target IP/Range", inputPlaceholder: "192.168.1.0/24" };
      case "apk":
        return { title: "APK Analyzer", inputLabel: "APK File Path or URL", inputPlaceholder: "https://example.com/app.apk" };
      case "windows":
        return { title: "Windows Security Scanner", inputLabel: "Target Hostname/IP", inputPlaceholder: "DC-SERVER-01" };
      default:
        return { title: "", inputLabel: "", inputPlaceholder: "" };
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-12 px-4">
        <div className="container mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">
              <span className="text-foreground">Security </span>
              <span className="text-gradient">Dashboard</span>
            </h1>
            <p className="text-muted-foreground">
              Monitor and manage your security assessments
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {stats.map((stat, index) => (
              <StatCard key={index} {...stat} />
            ))}
          </div>

          {/* Tools and Activity Grid */}
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Tools Section */}
            <div className="lg:col-span-2">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Activity className="w-5 h-5 text-primary" />
                Quick Launch
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {tools.map((tool) => (
                  <ToolCard
                    key={tool.id}
                    {...tool}
                    onLaunch={() => setActiveModal(tool.id)}
                  />
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div>
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5 text-primary" />
                Recent Activity
              </h2>
              <div className="cyber-card">
                <div className="relative z-10 space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between py-3 border-b border-border/30 last:border-0 last:pb-0"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-2 h-2 rounded-full ${
                          activity.status === "completed" ? "bg-secondary" :
                          activity.status === "in-progress" ? "bg-primary animate-pulse" :
                          "bg-muted"
                        }`} />
                        <div>
                          <p className="text-sm font-medium text-foreground font-mono">
                            {activity.target}
                          </p>
                          <p className="text-xs text-muted-foreground">{activity.time}</p>
                        </div>
                      </div>
                      {activity.findings > 0 && (
                        <span className="text-xs px-2 py-1 rounded bg-destructive/20 text-destructive font-mono">
                          {activity.findings} issues
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Scanner Modals */}
      {activeModal && (
        <ScannerModal
          isOpen={true}
          onClose={() => setActiveModal(null)}
          {...getModalConfig(activeModal)}
        />
      )}
    </div>
  );
};

export default Dashboard;
