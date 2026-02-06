import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, AlertTriangle, CheckCircle, XCircle } from "lucide-react";

interface ScannerModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  inputLabel: string;
  inputPlaceholder: string;
}

interface ScanResult {
  severity: "high" | "medium" | "low";
  title: string;
  description: string;
}

const ScannerModal = ({ isOpen, onClose, title, inputLabel, inputPlaceholder }: ScannerModalProps) => {
  const [target, setTarget] = useState("");
  const [isScanning, setIsScanning] = useState(false);
  const [results, setResults] = useState<ScanResult[] | null>(null);

  const mockResults: ScanResult[] = [
    { severity: "high", title: "SQL Injection Vulnerability", description: "Parameter 'id' is vulnerable to SQL injection attacks." },
    { severity: "medium", title: "Missing Security Headers", description: "X-Frame-Options header is not set." },
    { severity: "low", title: "Information Disclosure", description: "Server version exposed in response headers." },
  ];

  const handleScan = () => {
    if (!target.trim()) return;
    
    setIsScanning(true);
    setResults(null);
    
    // Simulate scanning
    setTimeout(() => {
      setIsScanning(false);
      setResults(mockResults);
    }, 3000);
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case "high":
        return <XCircle className="w-5 h-5 text-destructive" />;
      case "medium":
        return <AlertTriangle className="w-5 h-5 text-accent" />;
      case "low":
        return <CheckCircle className="w-5 h-5 text-secondary" />;
      default:
        return null;
    }
  };

  const handleClose = () => {
    setTarget("");
    setResults(null);
    setIsScanning(false);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="bg-card border-border/50 max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl terminal-text">{title}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="target" className="text-foreground">{inputLabel}</Label>
            <Input
              id="target"
              placeholder={inputPlaceholder}
              value={target}
              onChange={(e) => setTarget(e.target.value)}
              className="font-mono"
            />
          </div>

          <Button 
            onClick={handleScan} 
            disabled={isScanning || !target.trim()}
            variant="cyber"
            className="w-full"
          >
            {isScanning ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
                Scanning...
              </>
            ) : (
              "Start Scan"
            )}
          </Button>

          {isScanning && (
            <div className="p-4 rounded-lg bg-muted/50 border border-primary/30">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <p className="text-sm font-mono text-primary">
                  Analyzing target vulnerabilities...
                </p>
              </div>
              <div className="mt-3 h-1 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-primary animate-pulse" style={{ width: "60%" }} />
              </div>
            </div>
          )}

          {results && (
            <div className="space-y-3">
              <h4 className="text-sm font-semibold text-foreground">
                Scan Results ({results.length} vulnerabilities found)
              </h4>
              {results.map((result, index) => (
                <div
                  key={index}
                  className="p-4 rounded-lg bg-muted/30 border border-border/50 hover:border-primary/30 transition-colors"
                >
                  <div className="flex items-start gap-3">
                    {getSeverityIcon(result.severity)}
                    <div>
                      <p className="font-medium text-foreground">{result.title}</p>
                      <p className="text-sm text-muted-foreground mt-1">{result.description}</p>
                      <span className={`text-xs uppercase font-mono mt-2 inline-block px-2 py-1 rounded ${
                        result.severity === "high" ? "bg-destructive/20 text-destructive" :
                        result.severity === "medium" ? "bg-accent/20 text-accent" :
                        "bg-secondary/20 text-secondary"
                      }`}>
                        {result.severity}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ScannerModal;
