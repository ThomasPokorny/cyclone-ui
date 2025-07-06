import { createUserClient } from "@/utils/supabase/server"
import { redirect } from "next/navigation"
import Header from "@/components/Header"
import DashboardWelcome from "./components/DashboardWelcome"
import { getInstallationByUserId } from "../actions/github"
import { getOrganizations } from "../actions/organization"
import CreateFirstOrganization from "./components/CreateFirstOrganization"
import DashboardOrganizations from "./components/DashboardOrganizations";


export default async function Dashboard() {
  const supabase = await createUserClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    redirect("/")
  }

  const installationResult = await getInstallationByUserId()
  const hasInstallation = installationResult.success && installationResult.data
  
  // If installation exists, check for organizations
  let organizations = []
  if (hasInstallation) {
    const organizationsResult = await getOrganizations()
    if (organizationsResult.success && organizationsResult.data) {
      organizations = organizationsResult.data
    }
  }

  return (
      <div className="min-h-screen bg-background">
        <Header supabaseUser={user} />
        {!hasInstallation ? (
          <DashboardWelcome />
        ) : organizations.length === 0 ? (
          <CreateFirstOrganization />
        ) : (
          <DashboardOrganizations organizations={organizations} />
        )}
      </div>
  )
}