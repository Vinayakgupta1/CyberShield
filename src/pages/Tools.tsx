import { useState } from "react";
import Navbar from "@/components/Navbar";
import ScannerModal from "@/components/ScannerModal";
import { Button } from "@/components/ui/button";
import { 
  Globe, Wifi, Smartphone, Monitor, Search, 
  FileSearch, Database, Key, Terminal, Code,
  Network, Server, Shield, Bug, Lock
} from "lucide-react";

interface Tool {
  id: string;
  category: string;
  title: string;
  description: string;
  icon: any;
  features: string[];
  inputLabel: string;
  inputPlaceholder: string;
}

const Tools = () => {
  const [activeModal, setActiveModal] = useState<Tool | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    { id: "all", label: "All Tools" },
    { id: "web", label: "Web Security" },
    { id: "network", label: "Network" },
    { id: "mobile", label: "Mobile" },
    { id: "windows", label: "Windows" },
  ];

  const tools: Tool[] = [
    // Web Security Tools
    {
      id: "web-scanner",
      category: "web",
      title: "Web Vulnerability Scanner",
      description: "Comprehensive web application security testing",
      icon: Globe,
      features: ["XSS Detection", "SQL Injection", "CSRF Testing", "Header Analysis"],
      inputLabel: "Target URL",
      inputPlaceholder: "https://example.com",
    },
    {
      id: "dir-enum",
      category: "web",
      title: "Directory Enumeration",
      description: "Discover hidden directories and files",
      icon: FileSearch,
      features: ["Wordlist Attack", "Recursive Scan", "Extension Bruteforce"],
      inputLabel: "Target URL",
      inputPlaceholder: "https://example.com",
    },
    {
      id: "subdomain",
      category: "web",
      title: "Subdomain Finder",
      description: "Enumerate subdomains for a target domain",
      icon: Search,
      features: ["DNS Bruteforce", "Certificate Search", "API Integration"],
      inputLabel: "Target Domain",
      inputPlaceholder: "example.com",
    },
    {
      id: "sql-injection",
      category: "web",
      title: "SQL Injection Tester",
      description: "Test for SQL injection vulnerabilities",
      icon: Database,
      features: ["Error-based", "Blind SQLi", "Time-based", "Union-based"],
      inputLabel: "Target URL with Parameters",
      inputPlaceholder: "https://example.com/page?id=1",
    },

    // Network Tools
    {
      id: "port-scanner",
      category: "network",
      title: "Port Scanner",
      description: "Scan for open ports and services",
      icon: Network,
      features: ["TCP Scan", "UDP Scan", "Service Detection", "OS Fingerprinting"],
      inputLabel: "Target IP/Range",
      inputPlaceholder: "192.168.1.0/24",
    },
    {
      id: "network-mapper",
      category: "network",
      title: "Network Mapper",
      description: "Map network topology and discover hosts",
      icon: Wifi,
      features: ["Host Discovery", "Topology Mapping", "ARP Scan"],
      inputLabel: "Network Range",
      inputPlaceholder: "192.168.1.0/24",
    },
    {
      id: "vulnerability-scanner",
      category: "network",
      title: "Network Vulnerability Scanner",
      description: "Scan network for known vulnerabilities",
      icon: Bug,
      features: ["CVE Detection", "Exploit Check", "Compliance Scan"],
      inputLabel: "Target IP/Hostname",
      inputPlaceholder: "192.168.1.1",
    },
    {
      id: "packet-capture",
      category: "network",
      title: "Packet Analyzer",
      description: "Capture and analyze network traffic",
      icon: Terminal,
      features: ["Live Capture", "Protocol Analysis", "Traffic Statistics"],
      inputLabel: "Interface Name",
      inputPlaceholder: "eth0",
    },

    // Mobile Tools
    {
      id: "apk-analyzer",
      category: "mobile",
      title: "APK Analyzer",
      description: "Static analysis of Android applications",
      icon: Smartphone,
      features: ["Manifest Analysis", "Permission Check", "Code Review", "Signature Verify"],
      inputLabel: "APK Path/URL",
      inputPlaceholder: "/path/to/app.apk",
    },
    {
      id: "api-tester",
      category: "mobile",
      title: "Mobile API Tester",
      description: "Test mobile backend APIs for vulnerabilities",
      icon: Code,
      features: ["Auth Testing", "Rate Limiting", "Data Exposure", "API Fuzzing"],
      inputLabel: "API Endpoint",
      inputPlaceholder: "https://api.example.com",
    },
    {
      id: "ssl-checker",
      category: "mobile",
      title: "SSL/TLS Analyzer",
      description: "Analyze SSL/TLS configuration and certificates",
      icon: Lock,
      features: ["Certificate Chain", "Cipher Suites", "Protocol Version", "Vulnerabilities"],
      inputLabel: "Target Domain",
      inputPlaceholder: "example.com:443",
    },

    // Windows Tools
    {
      id: "windows-scanner",
      category: "windows",
      title: "Windows Vulnerability Scanner",
      description: "Scan Windows systems for vulnerabilities",
      icon: Monitor,
      features: ["Missing Patches", "Misconfigurations", "Registry Check", "Service Analysis"],
      inputLabel: "Target Hostname/IP",
      inputPlaceholder: "WORKSTATION-01",
    },
    {
      id: "ad-scanner",
      category: "windows",
      title: "Active Directory Scanner",
      description: "Enumerate and assess AD security",
      icon: Server,
      features: ["User Enum", "Group Policy", "Kerberoasting", "Password Policy"],
      inputLabel: "Domain Controller",
      inputPlaceholder: "DC01.domain.local",
    },
    {
      id: "privilege-checker",
      category: "windows",
      title: "Privilege Escalation Checker",
      description: "Find privilege escalation paths",
      icon: Key,
      features: ["Unquoted Paths", "Weak Permissions", "Token Privileges", "AlwaysInstallElevated"],
      inputLabel: "Target System",
      inputPlaceholder: "localhost",
    },
    {
      id: "malware-scanner",
      category: "windows",
      title: "Malware Scanner",
      description: "Scan for malicious files and processes",
      icon: Shield,
      features: ["File Scan", "Process Check", "Registry Analysis", "Startup Items"],
      inputLabel: "Scan Path",
      inputPlaceholder: "C:\\Users",
    },
  ];

  const filteredTools = selectedCategory === "all" 
    ? tools 
    : tools.filter(tool => tool.category === selectedCategory);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-12 px-4">
        <div className="container mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">
              <span className="text-foreground">Security </span>
              <span className="text-gradient">Tools</span>
            </h1>
            <p className="text-muted-foreground">
              Complete arsenal of security assessment tools
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 mb-8">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "cyber" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category.id)}
              >
                {category.label}
              </Button>
            ))}
          </div>

          {/* Tools Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredTools.map((tool) => (
              <div
                key={tool.id}
                className="cyber-card group cursor-pointer"
                onClick={() => setActiveModal(tool)}
              >
                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-3 rounded-lg bg-primary/10 border border-primary/30 group-hover:cyber-glow transition-all duration-300">
                      <tool.icon className="w-5 h-5 text-primary" />
                    </div>
                    <span className="text-xs px-2 py-1 rounded bg-muted text-muted-foreground capitalize">
                      {tool.category}
                    </span>
                  </div>
                  
                  <h3 className="text-base font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {tool.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {tool.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-1">
                    {tool.features.slice(0, 3).map((feature, index) => (
                      <span
                        key={index}
                        className="text-xs px-2 py-0.5 rounded bg-primary/10 text-primary border border-primary/20"
                      >
                        {feature}
                      </span>
                    ))}
                    {tool.features.length > 3 && (
                      <span className="text-xs px-2 py-0.5 rounded bg-muted text-muted-foreground">
                        +{tool.features.length - 3}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Scanner Modal */}
      {activeModal && (
        <ScannerModal
          isOpen={true}
          onClose={() => setActiveModal(null)}
          title={activeModal.title}
          inputLabel={activeModal.inputLabel}
          inputPlaceholder={activeModal.inputPlaceholder}
        />
      )}
    </div>
  );
};

export default Tools;
