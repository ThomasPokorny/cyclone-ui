'use client'

import {useState} from "react";
import {ArrowRight, Building2, Shield, Users, Zap} from "lucide-react";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import {Button} from "@/components/ui/button";
import {createOrganization} from "../../actions/organization";

export default function CreateFirstOrganization() {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim()) return;

        setIsSubmitting(true);
        setError("");

        try {
            const result = await createOrganization(name.trim(), description.trim());
            
            if (result.success) {
                // Refresh the page to show the organization was created
                window.location.reload();
            } else {
                setError(result.error || "Failed to create organization");
            }
        } catch (err) {
            setError("An unexpected error occurred");
        } finally {
            setIsSubmitting(false);
        }
    };

    const features = [
        {
            icon: Users,
            title: "Team Collaboration",
            description: "Invite team members and collaborate on code reviews seamlessly"
        },
        {
            icon: Shield,
            title: "Enterprise Security",
            description: "Advanced security features to protect your organization's code"
        },
        {
            icon: Zap,
            title: "AI-Powered Reviews",
            description: "Get intelligent code suggestions and automated quality checks"
        }
    ];

    return (
        <div className="min-h-screen bg-background gradient-mesh">
            <div className="container mx-auto px-6 py-16">
                <div className="max-w-4xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-12">
                        <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center mx-auto mb-6">
                            <Building2 className="w-8 h-8 text-background" />
                        </div>
                        <h1 className="text-4xl font-bold text-gradient mb-4">
                            Create Your First Organization
                        </h1>
                        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                            Set up your organization to start leveraging Cyclone AI's powerful code review capabilities
                        </p>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-12 items-start">
                        {/* Form */}
                        <Card className="border-gradient">
                            <div className="border-gradient-inner">
                                <CardHeader>
                                    <CardTitle className="text-2xl">Organization Details</CardTitle>
                                    <CardDescription>
                                        Enter your organization information to get started
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        <div className="space-y-2">
                                            <Label htmlFor="org-name" className="text-base font-medium">
                                                Organization Name *
                                            </Label>
                                            <Input
                                                id="org-name"
                                                type="text"
                                                placeholder="e.g. Acme Corporation"
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                                className="h-12 text-base"
                                                required
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="org-description" className="text-base font-medium">
                                                Description
                                            </Label>
                                            <Textarea
                                                id="org-description"
                                                placeholder="Brief description of your organization or team"
                                                value={description}
                                                onChange={(e) => setDescription(e.target.value)}
                                                rows={4}
                                                className="text-base resize-none"
                                            />
                                            <p className="text-sm text-muted-foreground">
                                                Help your team understand what this organization is for
                                            </p>
                                        </div>

                                        {error && (
                                            <div className="text-sm text-red-500 bg-red-50 p-3 rounded-md">
                                                {error}
                                            </div>
                                        )}

                                        <Button
                                            type="submit"
                                            className="w-full h-12 text-base bg-primary hover:bg-primary/90"
                                            disabled={!name.trim() || isSubmitting}
                                        >
                                            {isSubmitting ? (
                                                "Creating Organization..."
                                            ) : (
                                                <>
                                                    Create Organization
                                                    <ArrowRight className="w-5 h-5 ml-2" />
                                                </>
                                            )}
                                        </Button>
                                    </form>
                                </CardContent>
                            </div>
                        </Card>

                        {/* Features */}
                        <div className="space-y-6">
                            <h2 className="text-2xl font-bold">What you'll get</h2>
                            <div className="space-y-4">
                                {features.map((feature, index) => (
                                    <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                                        <div className="flex items-start gap-4">
                                            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                                                <feature.icon className="w-6 h-6 text-primary" />
                                            </div>
                                            <div>
                                                <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                                                <p className="text-muted-foreground">{feature.description}</p>
                                            </div>
                                        </div>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="text-center mt-16 pt-8 border-t border-border/50">
                        <p className="text-muted-foreground">
                            Need help? Contact our support team at{" "}
                            <a href="mailto:support@cyclone-ai.com" className="text-primary hover:underline">
                                support@cyclone-ai.com
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}