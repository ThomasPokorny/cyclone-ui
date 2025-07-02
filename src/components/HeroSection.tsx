
import { ArrowRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface HeroSectionProps {
  onGetEarlyAccess: () => void;
}

const HeroSection = ({ onGetEarlyAccess }: HeroSectionProps) => {
  return (
    <section className="relative py-20 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 gradient-mesh"></div>
      <div className="container mx-auto px-6 relative">
        <div className="text-center max-w-4xl mx-auto">
          <Badge variant="secondary" className="mb-6 px-4 py-2 text-sm animate-pulse-slow">
            <Star className="w-4 h-4 mr-2" />
            Trusted by 500+ development teams
          </Badge>
          <h1 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight">
            AI-Powered
            <span className="text-gradient block">Code Reviews</span>
            at Lightning Speed
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            Cyclone AI revolutionizes your development workflow with intelligent code analysis, 
            automated security checks, and seamless GitHub integration.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button size="lg" className="bg-primary hover:bg-primary/90 px-8 py-4 text-lg" onClick={onGetEarlyAccess}>
              Get Early Access
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
