
import { Zap, Github, Shield, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const FeaturesSection = () => {
  const features = [
    {
      icon: <Zap className="w-6 h-6" />,
      title: "AI-Powered Reviews",
      description: "Advanced machine learning algorithms analyze your code for bugs, security issues, and performance optimizations."
    },
    {
      icon: <Github className="w-6 h-6" />,
      title: "GitHub Integration",
      description: "Seamlessly integrates with your existing GitHub workflow. Automatic PR reviews and inline comments."
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Security First",
      description: "Identify security vulnerabilities and compliance issues before they reach production."
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Team Collaboration",
      description: "Enhanced team productivity with intelligent suggestions and automated code quality checks."
    }
  ];

  return (
    <section id="features" className="py-20 lg:py-32">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Built for Modern
            <span className="text-gradient block">Development Teams</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Experience the future of code review with AI that understands your codebase
            and accelerates your development cycle.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <div key={index} className="border-gradient animate-float" style={{animationDelay: `${index * 0.5}s`}}>
              <Card className="border-gradient-inner h-full p-8 hover:shadow-lg transition-all duration-300">
                <CardContent className="p-0">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-semibold">{feature.title}</h3>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
