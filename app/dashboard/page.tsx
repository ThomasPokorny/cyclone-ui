import { createUserClient } from "@/utils/supabase/server"
import { redirect } from "next/navigation"
import Header from "@/components/Header"
import DashboardWelcome from "./components/DashboardWelcome"


export default async function Dashboard() {
  const supabase = await createUserClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    redirect("/")
  }

  return (
      <div className="min-h-screen bg-background">
        <Header supabaseUser={user} />
        <DashboardWelcome />
      </div>
  )
}

/*
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Welcome to Cyclone AI Dashboard</h1>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                🚀 Get Started
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                To start using Cyclone AI for code reviews, you need to install our GitHub App on your repositories.
              </p>
              <ConnectGitHubButton/>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Your Account</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Signed in as: <span className="font-medium">{user.email}</span>
              </p>
            </CardContent>
          </Card>
        </div>
 */