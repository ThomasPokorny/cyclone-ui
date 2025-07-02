
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CTASectionProps {
  onGetEarlyAccess: () => void;
}

const CTASection = ({ onGetEarlyAccess }: CTASectionProps) => {
  return (
    <section className="py-20 lg:py-32">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Ready to Transform
            <span className="text-gradient block">Your Code Reviews?</span>
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Join thousands of developers who trust Cyclone AI to enhance their code quality and accelerate development.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-primary hover:bg-primary/90 px-8 py-4 text-lg" onClick={onGetEarlyAccess}>
              Get Early Access
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button variant="outline" size="lg" className="px-8 py-4 text-lg border-border/50 hover:border-primary/50">
              Schedule Demo
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
