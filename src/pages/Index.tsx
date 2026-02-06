import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import { Shield, Globe, Wifi, Smartphone, Monitor, Lock, ArrowRight, Zap, Target, Eye } from "lucide-react";

const Index = () => {
  const features = [
    {
      icon: Globe,
      title: "Web Scanner",
      description: "Detect XSS, SQL injection, CSRF, and other web vulnerabilities",
    },
    {
      icon: Wifi,
      title: "Network Scanner",
      description: "Port scanning, service detection, and network mapping",
    },
    {
      icon: Smartphone,
      title: "APK Analyzer",
      description: "Reverse engineer and analyze Android applications",
    },
    {
      icon: Monitor,
      title: "Windows Security",
      description: "System hardening and vulnerability assessment",
    },
    {
      icon: Lock,
      title: "Password Manager",
      description: "Secure storage for all your credentials",
    },
  ];

  const stats = [
    { value: "10K+", label: "Vulnerabilities Found" },
    { value: "500+", label: "Active Users" },
    { value: "99.9%", label: "Uptime" },
    { value: "24/7", label: "Monitoring" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        <div className="scan-line" />
        
        {/* Background grid effect */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `linear-gradient(hsl(var(--primary) / 0.3) 1px, transparent 1px),
                             linear-gradient(90deg, hsl(var(--primary) / 0.3) 1px, transparent 1px)`,
            backgroundSize: '50px 50px',
          }}
        />
        
        <div className="container mx-auto relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 mb-8">
              <Zap className="w-4 h-4 text-primary" />
              <span className="text-sm text-primary font-mono">v2.0 Now Available</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
              <span className="text-foreground">Advanced </span>
              <span className="text-gradient">Cyber Security</span>
              <br />
              <span className="text-foreground">Toolkit</span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
              Comprehensive vulnerability assessment for web applications, networks, 
              mobile apps, and Windows systems. All-in-one security platform.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/dashboard">
                <Button variant="cyber" size="lg" className="group">
                  Launch Dashboard
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/tools">
                <Button variant="outline" size="lg">
                  Explore Tools
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="cyber-card text-center">
                <p className="text-3xl md:text-4xl font-bold terminal-text mb-2">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="text-foreground">Security </span>
              <span className="text-gradient">Toolkit</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Everything you need to assess and improve your security posture
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="cyber-card group">
                <div className="relative z-10">
                  <div className="p-3 rounded-lg bg-primary/10 border border-primary/30 w-fit mb-4 group-hover:cyber-glow transition-all duration-300">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="cyber-card max-w-4xl mx-auto text-center">
            <div className="relative z-10">
              <Shield className="w-16 h-16 text-primary mx-auto mb-6 animate-float" />
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to Secure Your Assets?
              </h2>
              <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
                Start scanning for vulnerabilities today and protect your digital infrastructure
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/login">
                  <Button variant="cyber" size="lg">
                    Get Started
                  </Button>
                </Link>
                <Link to="/tools">
                  <Button variant="outline" size="lg">
                    View All Tools
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-border/30">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Shield className="w-6 h-6 text-primary" />
              <span className="font-bold terminal-text">CyberShield</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2024 CyberShield. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
