import { createUserClient } from "@/utils/supabase/server"
import { redirect } from "next/navigation"
import Header from "@/components/Header"
import DashboardWelcome from "./components/DashboardWelcome"
import { getInstallationByUserId } from "../actions/github"
import CreateFirstOrganization from "./components/CreateFirstOrganization";


export default async function Dashboard() {
  const supabase = await createUserClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    redirect("/")
  }

  const installationResult = await getInstallationByUserId()
  const hasInstallation = installationResult.success && installationResult.data

  return (
      <div className="min-h-screen bg-background">
        <Header supabaseUser={user} />
        {hasInstallation ? (
          <CreateFirstOrganization />
        ) : (
          <DashboardWelcome />
        )}
      </div>
  )
}