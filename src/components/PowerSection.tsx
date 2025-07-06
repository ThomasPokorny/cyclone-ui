import { Zap, Shield, Rocket, Brain } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const PowersSection = () => {
    const powers = [
        {
            icon: <Brain className="w-8 h-8" />,
            title: "Intelligent Analysis",
            description: "AI that understands your codebase context and coding patterns"
        },
        {
            icon: <Zap className="w-8 h-8" />,
            title: "Lightning Fast",
            description: "Get instant feedback on every pull request without delays"
        },
        {
            icon: <Shield className="w-8 h-8" />,
            title: "Security First",
            description: "Proactive vulnerability detection before code reaches production"
        },
        {
            icon: <Rocket className="w-8 h-8" />,
            title: "Productivity Boost",
            description: "Focus on building features while AI handles code quality"
        }
    ];

    return (
        <section className="py-16 border-y border-border/50">
            <div className="container mx-auto px-6">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold mb-4">
                        The Power of
                        <span className="text-gradient block">AI-Driven Development</span>
                    </h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        Discover what makes Cyclone AI the future of code review and development workflow optimization.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {powers.map((power, index) => (
                        <Card key={index} className="border-gradient-inner hover:shadow-lg transition-all duration-300 group">
                            <CardContent className="p-6 text-center">
                                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-4 mx-auto group-hover:scale-110 transition-transform duration-300">
                                    {power.icon}
                                </div>
                                <h3 className="text-lg font-semibold mb-2">{power.title}</h3>
                                <p className="text-muted-foreground text-sm leading-relaxed">
                                    {power.description}
                                </p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default PowersSection;
