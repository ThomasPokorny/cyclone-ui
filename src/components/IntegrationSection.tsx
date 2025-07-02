
import { ArrowRight, Github, CheckCircle } from "lucide-react";

const IntegrationSection = () => {
  return (
    <section className="py-20 lg:py-32 bg-muted/20">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Seamless GitHub
            <span className="text-gradient block">Integration</span>
          </h2>
          <p className="text-xl text-muted-foreground mb-12">
            Connect your repositories in seconds and let Cyclone AI enhance your code review process.
          </p>
          
          <div className="bg-card/50 backdrop-blur rounded-2xl p-8 border border-border/50">
            <div className="flex items-center justify-center gap-8 mb-8">
              <div className="flex items-center gap-3">
                <Github className="w-8 h-8 text-muted-foreground" />
                <span className="text-lg font-medium">GitHub</span>
              </div>
              <ArrowRight className="w-6 h-6 text-primary animate-pulse" />
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                  <span className="text-background font-bold">🌪️</span>
                </div>
                <span className="text-lg font-medium text-gradient">Cyclone AI</span>
              </div>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6 text-left">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-medium mb-1">Automatic PR Reviews</h4>
                  <p className="text-sm text-muted-foreground">AI reviews every pull request</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-medium mb-1">Inline Comments</h4>
                  <p className="text-sm text-muted-foreground">Contextual suggestions directly in code</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-medium mb-1">Security Alerts</h4>
                  <p className="text-sm text-muted-foreground">Real-time vulnerability detection</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IntegrationSection;
