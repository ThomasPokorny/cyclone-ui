import { createUserClient } from "@/utils/supabase/server"
import { redirect } from "next/navigation"
import Header from "@/components/Header"
import DashboardWelcome from "./components/DashboardWelcome"
import { getInstallationByUserId } from "../actions/github"
import { getOrganizations } from "../actions/organization"
import { getTotalRepositoryCount } from "../actions/repositories"
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
  let totalRepositories = 0
  if (hasInstallation) {
    const organizationsResult = await getOrganizations()
    if (organizationsResult.success && organizationsResult.data) {
      organizations = organizationsResult.data
      
      // Get total repository count across all organizations
      const repositoryCountResult = await getTotalRepositoryCount()
      if (repositoryCountResult.success) {
        totalRepositories = repositoryCountResult.count
      }
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
          <DashboardOrganizations organizations={organizations} totalRepositories={totalRepositories} />
        )}
      </div>
  )
}