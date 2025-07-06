"use server"

import { getAdminClient, createUserClient } from "@/utils/supabase/server"
import { getOrganizations } from "./organization"

export async function getRepositoriesByOrganizationId(organizationId: string) {
  try {
    const authSupabase = await createUserClient()
    const supabase = getAdminClient()
    
    // Get current user
    const { data: { user }, error: userError } = await authSupabase.auth.getUser()
    
    if (userError || !user) {
      console.error("Failed to get user:", userError)
      return {
        success: false,
        error: "User not authenticated",
      }
    }

    // First, verify the user has access to this organization
    console.log("🔐 Checking user access to organization:", organizationId)
    
    const organizationsResult = await getOrganizations()
    
    if (!organizationsResult.success || !organizationsResult.data) {
      console.error("No organizations found for user:", user.id)
      return {
        success: false,
        error: "No organizations found or access denied",
      }
    }

    // Check if the organization ID is in the user's list of organizations
    const hasAccess = organizationsResult.data.some((org: any) => org.id === Number.parseInt(organizationId))
    
    if (!hasAccess) {
      console.error("User does not have access to organization:", organizationId)
      return {
        success: false,
        error: "Access denied to this organization",
      }
    }

    console.log("✅ User has access to organization, fetching repositories")

    // Now fetch repositories for this organization
    const { data, error } = await supabase
      .from("repository")
      .select("id, name, custom_prompt")
      .eq("organization_id", organizationId)

    if (error) {
      console.error("Supabase error:", error)
      return {
        success: false,
        error: "Failed to fetch repositories",
      }
    }

    console.log("✅ Repositories found:", data?.length || 0)

    return {
      success: true,
      data: data || [],
    }
  } catch (error) {
    console.error("Server error:", error)
    return {
      success: false,
      error: "An unexpected error occurred. Please try again.",
    }
  }
}