import ConnectGitHubButton from "@/components/ConnectGitHubButton"
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card"
import {CheckCircle, Github} from "lucide-react"

export default function DashboardWelcome() {
  return (
    <div className="container mx-auto max-w-4xl p-6">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gradient mb-4">
          Welcome to Cyclone AI Dashboard
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Your AI-powered code review companion is ready to enhance your development workflow.
          Let's get you set up in just a few simple steps.
        </p>
      </div>

      {/* Let's Get Started Section */}
      <Card className="mb-8">
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center gap-2 text-2xl">
            Let's Get Started
          </CardTitle>
          <CardDescription className="text-base">
            Follow these steps to start using Cyclone AI for your code reviews
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-start gap-4 p-4 rounded-lg border bg-muted/50">
            <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-sm">
              1
            </div>
            <div className="flex-1">
              <h3 className="font-semibold mb-2">Install GitHub App</h3>
              <p className="text-muted-foreground mb-4">
                To start using Cyclone AI for code reviews, you need to install our GitHub App on your repositories.
              </p>
              <ConnectGitHubButton className={'bg-primary hover:bg-primary/90'}/>
            </div>
          </div>

          <div className="flex items-start gap-4 p-4 rounded-lg border bg-muted/20">
            <div className="w-8 h-8 bg-muted text-muted-foreground rounded-full flex items-center justify-center font-bold text-sm">
              2
            </div>
            <div className="flex-1">
              <h3 className="font-semibold mb-2 text-muted-foreground">Configure Organization & Repositories</h3>
              <p className="text-muted-foreground">
                Create organization and select which repositories you want Cyclone AI to monitor and review.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-4 rounded-lg border bg-muted/20">
            <div className="w-8 h-8 bg-muted text-muted-foreground rounded-full flex items-center justify-center font-bold text-sm">
              3
            </div>
            <div className="flex-1">
              <h3 className="font-semibold mb-2 text-muted-foreground">Start Reviewing</h3>
              <p className="text-muted-foreground">
                Create pull requests and watch as Cyclone AI provides intelligent code reviews.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Organizations</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs text-muted-foreground">
              Ready to be configured
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Repositories</CardTitle>
            <Github className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs text-muted-foreground">
              Waiting for GitHub App
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Code Reviews</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs text-muted-foreground">
              Ready to start
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}