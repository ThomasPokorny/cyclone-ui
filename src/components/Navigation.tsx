
import { ArrowRight, Github, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface NavigationProps {
  onGetEarlyAccess: () => void;
}

const Navigation = ({ onGetEarlyAccess }: NavigationProps) => {
  return (
    <nav className="border-b border-border/50 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
              <span className="text-background font-bold text-lg">🌪️</span>
            </div>
            <span className="font-bold text-xl text-gradient">Cyclone AI</span>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">Features</a>
            <a href="#pricing" className="text-muted-foreground hover:text-foreground transition-colors">Pricing</a>
            <Link href="/organizations" className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1">
              <Building2 className="w-4 h-4" />
              Organizations
            </Link>
            <Link href="/create-organization" className="text-muted-foreground hover:text-foreground transition-colors">
              Create Org
            </Link>
            <a href="https://github.com/ThomasPokorny/cyclone-ai" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2">
              <Github className="w-4 h-4" />
              GitHub
            </a>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm">Sign In</Button>
            <Button size="sm" className="bg-primary hover:bg-primary/90" onClick={onGetEarlyAccess}>
              Get Early Access
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
