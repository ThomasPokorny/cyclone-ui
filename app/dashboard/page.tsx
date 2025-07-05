import { createClient } from "@/utils/supabase/server"
import { redirect } from "next/navigation"
import ConnectGitHubButton from "@/components/ConnectGitHubButton"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default async function Dashboard() {
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    redirect("/")
  }

  return (
    <div className="container mx-auto px-6 py-8">
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
            <ConnectGitHubButton />
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
    </div>
  )
}