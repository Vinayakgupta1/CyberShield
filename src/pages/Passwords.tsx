import { useState } from "react";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  Key, Plus, Search, Eye, EyeOff, Copy, Trash2, 
  Edit, Globe, Server, Database, Shield, CheckCircle
} from "lucide-react";
import { toast } from "sonner";

interface Password {
  id: string;
  title: string;
  username: string;
  password: string;
  url?: string;
  category: string;
  notes?: string;
  createdAt: Date;
}

const Passwords = () => {
  const [passwords, setPasswords] = useState<Password[]>([
    {
      id: "1",
      title: "Production Server",
      username: "admin",
      password: "SuperSecure123!",
      url: "ssh://prod.example.com",
      category: "server",
      createdAt: new Date(),
    },
    {
      id: "2",
      title: "Database Admin",
      username: "db_admin",
      password: "DbP@ssw0rd!2024",
      url: "mysql://db.example.com:3306",
      category: "database",
      createdAt: new Date(),
    },
    {
      id: "3",
      title: "AWS Console",
      username: "security@company.com",
      password: "AwsK3y!Secure",
      url: "https://aws.amazon.com",
      category: "web",
      createdAt: new Date(),
    },
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [showPassword, setShowPassword] = useState<string | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newPassword, setNewPassword] = useState({
    title: "",
    username: "",
    password: "",
    url: "",
    category: "web",
    notes: "",
  });

  const categories = [
    { id: "web", label: "Website", icon: Globe },
    { id: "server", label: "Server", icon: Server },
    { id: "database", label: "Database", icon: Database },
    { id: "other", label: "Other", icon: Key },
  ];

  const filteredPasswords = passwords.filter(
    (p) =>
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} copied to clipboard`);
  };

  const handleDelete = (id: string) => {
    setPasswords(passwords.filter((p) => p.id !== id));
    toast.success("Password deleted");
  };

  const handleAddPassword = () => {
    if (!newPassword.title || !newPassword.username || !newPassword.password) {
      toast.error("Please fill in all required fields");
      return;
    }

    const password: Password = {
      id: Date.now().toString(),
      ...newPassword,
      createdAt: new Date(),
    };

    setPasswords([...passwords, password]);
    setNewPassword({
      title: "",
      username: "",
      password: "",
      url: "",
      category: "web",
      notes: "",
    });
    setIsAddModalOpen(false);
    toast.success("Password added successfully");
  };

  const getCategoryIcon = (category: string) => {
    const cat = categories.find((c) => c.id === category);
    return cat ? cat.icon : Key;
  };

  const generatePassword = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";
    let password = "";
    for (let i = 0; i < 16; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setNewPassword({ ...newPassword, password });
    toast.success("Password generated");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-12 px-4">
        <div className="container mx-auto max-w-5xl">
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">
                <span className="text-foreground">Password </span>
                <span className="text-gradient">Manager</span>
              </h1>
              <p className="text-muted-foreground">
                Securely store and manage your credentials
              </p>
            </div>
            
            <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
              <DialogTrigger asChild>
                <Button variant="cyber">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Password
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-card border-border/50">
                <DialogHeader>
                  <DialogTitle className="terminal-text">Add New Password</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Title *</Label>
                    <Input
                      placeholder="e.g., Production Server"
                      value={newPassword.title}
                      onChange={(e) => setNewPassword({ ...newPassword, title: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Username *</Label>
                    <Input
                      placeholder="Username or email"
                      value={newPassword.username}
                      onChange={(e) => setNewPassword({ ...newPassword, username: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Password *</Label>
                    <div className="flex gap-2">
                      <Input
                        type="text"
                        placeholder="Password"
                        value={newPassword.password}
                        onChange={(e) => setNewPassword({ ...newPassword, password: e.target.value })}
                        className="font-mono"
                      />
                      <Button variant="outline" onClick={generatePassword}>
                        Generate
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>URL</Label>
                    <Input
                      placeholder="https://example.com"
                      value={newPassword.url}
                      onChange={(e) => setNewPassword({ ...newPassword, url: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Category</Label>
                    <div className="flex flex-wrap gap-2">
                      {categories.map((cat) => (
                        <Button
                          key={cat.id}
                          variant={newPassword.category === cat.id ? "cyber" : "outline"}
                          size="sm"
                          onClick={() => setNewPassword({ ...newPassword, category: cat.id })}
                        >
                          <cat.icon className="w-4 h-4 mr-1" />
                          {cat.label}
                        </Button>
                      ))}
                    </div>
                  </div>
                  <Button variant="cyber" className="w-full" onClick={handleAddPassword}>
                    <Shield className="w-4 h-4 mr-2" />
                    Save Password
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* Search */}
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search passwords..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {categories.map((cat) => {
              const count = passwords.filter((p) => p.category === cat.id).length;
              return (
                <div key={cat.id} className="cyber-card">
                  <div className="relative z-10 flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10 border border-primary/30">
                      <cat.icon className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-xl font-bold terminal-text">{count}</p>
                      <p className="text-xs text-muted-foreground">{cat.label}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Password List */}
          <div className="space-y-3">
            {filteredPasswords.length === 0 ? (
              <div className="cyber-card text-center py-12">
                <Key className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No passwords found</p>
              </div>
            ) : (
              filteredPasswords.map((password) => {
                const CategoryIcon = getCategoryIcon(password.category);
                const isVisible = showPassword === password.id;

                return (
                  <div key={password.id} className="cyber-card group">
                    <div className="relative z-10">
                      <div className="flex items-start gap-4">
                        <div className="p-3 rounded-lg bg-primary/10 border border-primary/30">
                          <CategoryIcon className="w-5 h-5 text-primary" />
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2">
                            <h3 className="font-semibold text-foreground truncate">
                              {password.title}
                            </h3>
                            <div className="flex items-center gap-1">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => setShowPassword(isVisible ? null : password.id)}
                              >
                                {isVisible ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => handleCopy(password.password, "Password")}
                              >
                                <Copy className="w-4 h-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-destructive hover:text-destructive"
                                onClick={() => handleDelete(password.id)}
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                          
                          <div className="mt-2 space-y-1">
                            <div className="flex items-center gap-2">
                              <span className="text-xs text-muted-foreground w-16">Username:</span>
                              <span className="text-sm font-mono text-foreground">{password.username}</span>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-5 w-5"
                                onClick={() => handleCopy(password.username, "Username")}
                              >
                                <Copy className="w-3 h-3" />
                              </Button>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-xs text-muted-foreground w-16">Password:</span>
                              <span className="text-sm font-mono text-foreground">
                                {isVisible ? password.password : "••••••••••••"}
                              </span>
                            </div>
                            {password.url && (
                              <div className="flex items-center gap-2">
                                <span className="text-xs text-muted-foreground w-16">URL:</span>
                                <span className="text-sm font-mono text-primary truncate">{password.url}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Passwords;
