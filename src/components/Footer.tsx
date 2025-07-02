
import { Github } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border/50 py-12">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
              <span className="text-background font-bold text-lg">🌪️</span>
            </div>
            <span className="font-bold text-xl text-gradient">Cyclone AI</span>
          </div>
          <div className="flex items-center gap-6 text-muted-foreground">
            <a href="https://github.com/ThomasPokorny/cyclone-ai" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors flex items-center gap-2">
              <Github className="w-4 h-4" />
              GitHub
            </a>
            <span className="text-sm">© 2024 Cyclone AI. All rights reserved.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
